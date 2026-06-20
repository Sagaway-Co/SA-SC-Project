FROM python:3.12-slim

WORKDIR /app

# Fonts: Liberation (Times New Roman equiv) + Noto CJK (宋体/黑体 equiv)
RUN apt-get update && apt-get install -y --no-install-recommends \
        fonts-liberation \
        fonts-noto-cjk \
        fontconfig \
    && fc-cache -fv \
    && rm -rf /var/lib/apt/lists/*

# Dependencies (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && python3 -c "import matplotlib.font_manager as fm; fm._load_fontmanager(try_read_cache=False)" 2>/dev/null || true

# Source
COPY cif2txt/ ./cif2txt/
COPY app.py plotter.py ./

EXPOSE 8501

CMD ["streamlit", "run", "app.py", \
     "--server.address", "0.0.0.0", \
     "--server.port", "8501", \
     "--server.headless", "true", \
     "--browser.gatherUsageStats", "false"]
