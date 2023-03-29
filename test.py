import sqlite3

connection = sqlite3.connect("sqncd.db")

cursor = connection.cursor()
cursor.execute("INSERT INTO users ('username', 'email', 'hash') VALUES (?, ?, ?)", ['rafafa', 'rarara', 'peepee'])
connection.commit()
rows = cursor.execute("SELECT * FROM users").fetchall()
print(rows)