from config import app, db
from import_data import import_data


@app.cli.command("import-csv")
def import_csv_command():
    import_data('./data.csv')  # 將這裡的路徑替換為你的 CSV 檔案路徑
    print("CSV data has been imported.")


with app.app_context():
    db.create_all()




if __name__ == "__main__":
    app.run(debug=True)

# 223/2230034/澎湖第二信用合作社-陽明分社.html
