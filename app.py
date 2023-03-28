from flask import Flask, render_template, url_for, request
from werkzeug.wrappers import Request, Response

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


@app.route ('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        
        hashedPassword = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8 )
        return render_template('login.html')

    return render_template('login.html')


@app.route ('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
            username = request.form.get('username')
            email = request.form.get('email')
            password = request.form.get('password')
            cpassword = request.form.get('cpassword')



            return render_template('register.html')

    return render_template('register.html')
 

@app.route ('/passwordReset', methods=["GET", "POST"])
def passwordReset():
    return render_template('passwordReset.html')


@app.route ('/passwordChange', methods=["GET", "POST"])
def passwordChange():
    return render_template('passwordChange.html')


@app.route ('/news')
def news():
    return render_template('news.html')


@app.route ('/donate')
def donate():
    return render_template('donate.html')


@app.route ('/error')
def error():
    return render_template('error.html')




if __name__ == "__main__":
    app.run(debug=True)