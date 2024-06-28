from config import db

class Bank(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    code = db.Column(db.String(20))
    branches = db.relationship('Branch', backref='bank', lazy=True)

    def __repr__(self):
        return f'<Bank {self.name}>'


class Branch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))  
    branch_code = db.Column(db.String(20))
    tel = db.Column(db.String(20))  
    address = db.Column(db.String(200))
    bank_id = db.Column(db.Integer, db.ForeignKey(
        'bank.id'), nullable=False)

    def __repr__(self):
        return f'<Branch {self.name}>'



