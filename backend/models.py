from config import db
from datetime import datetime

class CustomDateTime (db.TypeDecorator):
    impl = db.DateTime

    def process_bind_param(self, value, dialect):
        if type(value) is str:
            return datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.000Z')
        return value

class TaskItem(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(80), default='Pessoal')
    due_date = db.Column(CustomDateTime, nullable=False)

    def to_json(self):
        return {
            'id': self._id,
            'description': self.description,
            'category': self.category,
            'due_date': self.due_date.isoformat()
        }