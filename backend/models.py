from config import db

class TaskItem(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(80), default='Pessoal')
    due_date = db.Column(db.DateTime, nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def to_json(self):
        return {
            'id': self._id,
            'description': self.description,
            'category': self.category,
            'due_date': self.due_date.isoformat(),
            'completed': self.completed
        }