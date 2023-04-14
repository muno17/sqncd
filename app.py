from flask import Flask, render_template

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


@app.route ('/contact', methods = ['GET', 'POST'])
def contact():
    return render_template('website/contact.html')


@app.route ('/success')
def success():
    return render_template('website/success.html')
 

@app.route ('/error')
def error():
    return render_template('website/error.html')



if __name__ == "__main__":
    app.run(debug=True)