FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends fonts-liberation fonts-noto-cjk fontconfig && fc-cache -fv && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY cif2txt/ ./cif2txt/
COPY plotter.py .
COPY backend/main.py .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
