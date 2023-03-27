from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sqncd')
def sqncd():
    return render_template('sqncd.html')


@app.route('/manual')
def manual():
    return render_template('manual.html')


@app.route('/account')
def account():
    return render_template('account.html')

@app.route ('/login')
def login():
    return render_template('login.html')

@app.route ('/register')
def register():
    return render_template('register.html')

@app.route ('/passwordReset')
def passwordReset():
    return render_template('passwordReset.html')










if __name__ == "__main__":
    app.run(debug=True)