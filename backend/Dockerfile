# 使用 Python 基礎映像
FROM python:3.12

# 設置工作目錄
WORKDIR /app

# 安裝 poetry
RUN pip install poetry

# 複製 pyproject.toml 和 poetry.lock 文件
COPY pyproject.toml poetry.lock ./

# 安裝依賴項，但不包括虛擬環境
RUN poetry config virtualenvs.create false && poetry install --no-root

# 複製後端代碼
COPY . .

# 確保 SQLite 資料庫文件存在
COPY instance/mydatabase.db /app/instance/mydatabase.db

# 設置環境變數
ENV FLASK_APP=main.py
ENV FLASK_ENV=development
ENV DATABASE_URL=sqlite:////app/instance/mydatabase.db

# 暴露應用埠
EXPOSE 5000

# 設置啟動命令
CMD ["poetry", "run", "flask", "run", "--host=0.0.0.0"]
