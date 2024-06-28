from flask_marshmallow import Marshmallow
from models import Bank, Branch

ma = Marshmallow()

class BranchSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Branch
        include_fk = True

class BankSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Bank
    branches = ma.Nested(BranchSchema, many=True)  # 嵌套序列化分行
