from config import app, db

# Create
# Read
# Update
# Delete

@app.route('/')
def index():
    return

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
