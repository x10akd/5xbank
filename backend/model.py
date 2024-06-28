from config import db

class Bank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    branches = db.relationship('Branch', backref='bank', lazy=True)

    def __repr__(self):
        return f'<Bank {self.name}>'


class Branch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)  # 分行名字，不能為空
    branch_code = db.Column(db.String(20), unique=True, nullable=False)  # 分行代碼，不能為空
    tel = db.Column(db.String(20), nullable=False)  # 分行電話，不能為空
    address = db.Column(db.String(200), nullable=False)  # 分行地址，不能為空
    bank_id = db.Column(db.Integer, db.ForeignKey(
        'bank.id'), nullable=False)  # 外鍵，對應銀行

    def __repr__(self):
        return f'<Branch {self.name}>'



