from config import app, db
from flask import request, jsonify
from models import TaskItem

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = TaskItem.query.all()
    json_tasks = list(map(lambda x: x.to_json(), tasks))
    return jsonify({'tasks': json_tasks})

@app.route('/add_task', methods=['POST'])
def create_task():
    description = request.json.get('description')
    category = request.json.get('category')
    due_date = request.json.get('dueDate')

    if not description or not category or not due_date:
        return (
            jsonify({'error': 'Missing required fields'}),
            400
        )
    
    new_task = TaskItem(
        description=description,
        category=category,
        due_date=due_date
    )

    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return (
            jsonify({'message': str(e)}),
            500
        )
    
    return (
        jsonify({'message': 'User created'}),
        201
    )

@app.route('/update_task/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = TaskItem.query.get(task_id)
    
    if not task:
        return (
            jsonify({'message': 'Task not found'}),
            404
        )
    
    data = request.json

    print(data, end='\n\n\n')
    
    task.description = data.get('description', task.description)
    task.category = data.get('category', task.category)
    task.due_date = data.get('dueDate', task.due_date)

    db.session.commit()

    return jsonify({'message': 'Task updated', 'task': task.to_json()}), 200

@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = TaskItem.query.get(task_id)

    if not task:
        return (
            jsonify({'message': 'Task not found'}),
            404
        )
    
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({'message': 'Task deleted'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
