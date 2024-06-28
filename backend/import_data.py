import pandas as pd
from config import db
from models import Bank, Branch


def import_data(csv_file_path):
    data = pd.read_csv(csv_file_path)

    for index, row in data.iterrows():
        bank_code = row['總機構代號']
        bank_name = row['機構名稱']
        branch_code = row['機構代號']
        branch_name = row['機構名稱']
        tel = row['電話']
        address = row['地址']

        # 查找或創建銀行
        bank = Bank.query.filter_by(code=bank_code).first()
        if not bank:
            bank = Bank(name=bank_name, code=bank_code)
            db.session.add(bank)
            db.session.commit()

        # 創建分行
        branch = Branch(
            name=branch_name,
            branch_code=branch_code,
            tel=tel,
            address=address,
            bank_id=bank.id
        )
        db.session.add(branch)

    db.session.commit()
