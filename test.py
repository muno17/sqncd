import sqlite3

connection = sqlite3.connect("sqncd.db")

cursor = connection.cursor()
#cursor.execute("INSERT INTO users ('username', 'email', 'hash') VALUES (?, ?, ?)", ['rafafa', 'rarara', 'peepee'])
#connection.commit()
#rows = cursor.execute("SELECT * FROM users").fetchall()
#print(rows)
username = 'ppppppppp'

test = cursor.execute("SELECT * FROM users WHERE username = ?", [username]).fetchall()
print(test)
if test:
    print('yea')