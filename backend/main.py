from flask import jsonify
from config import app, db
from models import Bank, Branch
from import_data import import_data  # 已匯完
from urllib.parse import unquote

@app.cli.command("import-csv")
def import_csv_command():
    import_data('./data.csv')  # 將這裡的路徑替換為你的 CSV 檔案路徑
    print("CSV data has been imported.")

@app.route("/banks/")
def get_banks():
    banks = Bank.query.all()
    banks_data = [{"name": bank.name, "code": bank.code} for bank in banks]
    return jsonify(banks_data)

@app.route("/<string:bank_code>/branches/")
def get_bank_branches(bank_code):
    bank = Bank.query.filter_by(code=bank_code).first()
    if not bank:
        return jsonify({"error": "Bank not found"}), 404

    branches = Branch.query.filter_by(bank_id=bank.id).all()
    branches_data = [{
        "name": branch.name,
        "branch_code": branch.branch_code,
        "tel": branch.tel,
        "address": branch.address
    } for branch in branches]

    return jsonify({"bank": bank.name, "branches": branches_data})


@app.route("/<string:bank_code>/<string:branch_code>/<string:branch_name>.html")
def get_branch(bank_code, branch_code, branch_name):
    branch_name = unquote(branch_name)
    bank = Bank.query.filter_by(code=bank_code).first()
    if not bank:
        return jsonify({"error": "Bank not found"}), 404

    branch = Branch.query.filter_by(branch_code=branch_code, bank_id=bank.id).first()
    if not branch:
        return jsonify({"error": "Branch not found"}), 404

    branch_data = {
        "name": branch.name,
        "branch_code": branch.branch_code,
        "tel": branch.tel,
        "address": branch.address,
        "bank_name": bank.name,
        "bank_code": bank.code
    }

    return jsonify(branch_data)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)


