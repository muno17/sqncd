from flask import Flask, render_template, request, redirect
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('website/index.html')


@app.route('/sqncd')
def sqncd():
    return render_template('apps/sqncd.html')

@app.route('/quickstart')
def quickstart():
    return render_template('website/quickstart.html')


@app.route('/manual')
def manual():
    return render_template('website/manual.html')


@app.route ('/news')
def news():
    return render_template('website/news.html')


@app.route ('/contact')
def contact():
    return render_template('website/contact.html')


@app.route ('/donate')
def donate():
    return render_template('website/donate.html')


@app.route('/account')
def account():
    return render_template('website/account.html')


@app.route ('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        connection = sqlite3.connect("sqncd.db")
        cursor = connection.cursor()

        username = request.form.get('username')
        password = request.form.get('password')
        

        usernameCheck = cursor.execute("SELECT * FROM users WHERE username = ?", [username]).fetchone()
        if usernameCheck:
            # error if password isn't correct
            if not check_password_hash(usernameCheck[3], password):
                return render_template('auth/login.html', error="incorrect password")

            else:
                return redirect('/')

        # error if username doesn't exist
        else:
            return render_template('auth/login.html', error="invalid username")
        


        return redirect('/')

    return render_template('auth/login.html')


@app.route ('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
        connection = sqlite3.connect("sqncd.db")
        cursor = connection.cursor()

        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        cpassword = request.form.get('cpassword') 

        # error if username already in use
        usernameCheck = cursor.execute("SELECT * FROM users WHERE username = ?", [username]).fetchall()
        if usernameCheck:
            return render_template('register.html', error="username already in use")

        # error if email already in use
        emailCheck = cursor.execute("SELECT * FROM users WHERE email = ?", [email]).fetchall()
        if emailCheck:
            return render_template('register.html', error="email already in use")

        # error if passwods don't match
        if password != cpassword:
            return render_template('register.html', error="passwords don't match")


        # hash the password
        hashedPassword = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8 )

        # insert into users table if there are no errors
        cursor.execute("INSERT INTO users ('username', 'email', 'hash') VALUES (?, ?, ?)", 
        [f'{username}', f'{email}', f'{hashedPassword}'])
        connection.commit()

        return redirect('/')

    print('yea')
    return render_template('auth/register.html')
 

@app.route ('/passwordReset', methods=["GET", "POST"])
def passwordReset():
    return render_template('auth/passwordReset.html')


@app.route ('/passwordChange', methods=["GET", "POST"])
def passwordChange():
    return render_template('auth/passwordChange.html')


@app.route ('/forgotUsername', methods=["GET", "POST"])
def forgotUsername():
    return render_template('auth/forgotUsername.html')


@app.route ('/error')
def error():
    return render_template('website/error.html')



if __name__ == "__main__":
    app.run(debug=True)