import sqlite3

connection = sqlite3.connect("sqncd.db")
cursor = connection.cursor()

# how to get a specific result
#connection.row_factory = sqlite3.Row
#cursor = connection.cursor()
#test = cursor.execute("SELECT * FROM users WHERE username = 'rafa'").fetchone()['hash']
#print(test)



#cursor.execute("INSERT INTO users ('username', 'email', 'hash') VALUES (?, ?, ?)", ['rafafa', 'rarara', 'peepee'])
#connection.commit()
#rows = cursor.execute("SELECT * FROM users").fetchall()
#print(rows)
#username = 'ppppppppp'


test = cursor.execute("SELECT * FROM users WHERE username = 'rafa'").fetchone()

print(test[3])
if test:
    print(test)