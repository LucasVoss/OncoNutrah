"""
Pipeline dos frames do hero:
  1. extrai frames do vídeo sem perda (PNG) a TARGET_FPS
  2. (opcional) amplia 4x com IA usando Real-ESRGAN (realesrgan-ncnn-vulkan, roda na GPU)
  3. reduz para 4K e HD com Lanczos + nitidez leve e salva em AVIF

Uso:
  py extract_frames.py                                  # sem IA (só reencoda)
  py extract_frames.py C:/caminho/realesrgan-ncnn-vulkan.exe   # com upscale por IA
  py extract_frames.py --reuse                          # refaz só a compressão, usando o upscale salvo
Download do Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN/releases (realesrgan-ncnn-vulkan-*-windows.zip)
"""
import os
import sys
import shutil
import subprocess

VIDEO_PATH = "../Buddha_bowl_ingredients_levitating_1080p_20261019231659.mp4"
CACHE_DIR = ".frames_cache"   # PNGs intermediários (fora do public/, não vai para o site)
OUTPUTS = [
    # (pasta, largura, qualidade AVIF)
    ("public/frames/loop-4k", 3840, 58),   # telas grandes / Retina
    ("public/frames/loop", 1920, 64),      # padrão: notebooks e celulares
]
TARGET_FPS = 12       # 96 frames; o FrameSequence mistura frames vizinhos, então o scrub continua fluido
CROP_Y = 0.01         # corta 1% em cima/embaixo: os primeiros frames têm faixas pretas (letterbox)
WHITE_FROM = 232      # pixels quase brancos viram branco puro: some o ruído de compressão do fundo
UPSCALE_MODEL = "realesrgan-x4plus"

def ensure(module, package):
    try:
        return __import__(module)
    except ImportError:
        print(f"{package} não encontrado. Instalando...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        return __import__(module)

def clean_background(frame, np):
    # Rampa suave de WHITE_FROM até WHITE_FROM+14 para não criar bordas duras
    m = frame.min(axis=2).astype(np.float32)
    a = np.clip((m - WHITE_FROM) / 14, 0, 1)[..., None]
    return (frame * (1 - a) + 255 * a).astype(np.uint8)

def extract_png(cv2, src_dir):
    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        sys.exit(f"Erro: não foi possível abrir '{VIDEO_PATH}'")
    source_fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Vídeo: {VIDEO_PATH}")
    print(f"FPS original: {source_fps:.2f} | Total frames: {total_frames} | Duração: {total_frames / source_fps:.2f}s")

    frame_interval = source_fps / TARGET_FPS
    frame_index = saved = 0
    next_capture = 0.0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_index >= next_capture:
            h = frame.shape[0]
            crop = int(h * CROP_Y)
            cv2.imwrite(os.path.join(src_dir, f"frame_{saved + 1:04d}.png"), frame[crop:h - crop])
            saved += 1
            next_capture += frame_interval
        frame_index += 1
    cap.release()
    print(f"{saved} frames extraídos a {TARGET_FPS} FPS")

def main():
    cv2 = ensure("cv2", "opencv-python")
    np = ensure("numpy", "numpy")
    ensure("PIL", "pillow>=11.3")
    from PIL import Image, ImageFilter, features
    if not features.check("avif"):
        sys.exit("Este Pillow não tem suporte a AVIF. Rode: pip install --upgrade pillow")

    arg = sys.argv[1] if len(sys.argv) > 1 else None
    reuse = arg == "--reuse"            # reaproveita .frames_cache/up (só refaz a compressão)
    upscaler = None if reuse else arg
    src_dir = os.path.join(CACHE_DIR, "src")
    up_dir = os.path.join(CACHE_DIR, "up")

    if reuse:
        if not os.path.isdir(up_dir):
            sys.exit(f"'{up_dir}' não existe: rode antes com o caminho do realesrgan-ncnn-vulkan.exe")
        frames_dir = up_dir
        upscaler = "cache"
    else:
        shutil.rmtree(CACHE_DIR, ignore_errors=True)
        os.makedirs(src_dir)
        extract_png(cv2, src_dir)
        frames_dir = src_dir

    if upscaler and not reuse:
        os.makedirs(up_dir)
        print(f"Ampliando 4x com {UPSCALE_MODEL} (pode levar ~20s por frame)...")
        subprocess.check_call([upscaler, "-i", src_dir, "-o", up_dir, "-n", UPSCALE_MODEL, "-s", "4", "-f", "png"],
                              stdout=subprocess.DEVNULL)
        frames_dir = up_dir

    for out_dir, _, _ in OUTPUTS:
        os.makedirs(out_dir, exist_ok=True)
        for old in os.listdir(out_dir):
            if old.startswith("frame_"):
                os.remove(os.path.join(out_dir, old))

    names = sorted(os.listdir(frames_dir))
    totals = [0] * len(OUTPUTS)
    for name in names:
        big = Image.open(os.path.join(frames_dir, name)).convert("RGB")
        for k, (out_dir, width, quality) in enumerate(OUTPUTS):
            im = big.resize((width, round(big.height * width / big.width)), Image.LANCZOS)
            if upscaler:
                im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=2))
            arr = clean_background(np.asarray(im), np)
            path = os.path.join(out_dir, name.replace(".png", ".avif"))
            Image.fromarray(arr).save(path, "AVIF", quality=quality, speed=4)
            totals[k] += os.path.getsize(path)

    for (out_dir, width, _), total in zip(OUTPUTS, totals):
        print(f"{out_dir}: {len(names)} frames {width}px, {total / 1024 / 1024:.1f} MB")

if __name__ == "__main__":
    main()
