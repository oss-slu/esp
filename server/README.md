# Flask server
This server has API endpoints supporting the application. Here's how you run this component individually.

The first time you want to run this code, you will need to:
1. Create a virtual environment: <code>python3 -m venv venv</code>
2. Activate virtual environment: 
   * On Mac or Linux: <code>source venv/bin/activate</code>
   * On Windows: <code>.\venv\Scripts\activate</code>
3. Install dependencies into the virtual environment: <code>pip3 install -r requirements.txt</code>

On all subsequent runs, you will need to:
1. Activate virtual environment: 
   * On Mac or Linux: <code>source venv/bin/activate</code>
   * On Windows: <code>.\venv\Scripts\activate</code>
2. Run the development server:
   * On Mac or Linux: <code>bash run_dev_server.sh</code>
   * On Windows: Open git bash terminal and run <code>bash run_dev_server.sh</code>