# SecureHer Chrome Extension


Welcome to SecureHer! 🚀
A Chrome extension designed to detect online harassment and protect user privacy during social media browsing. Created as part of the WieAct 3.0 Tech Challenge, SecureHer empowers users, especially women, by providing tools to stay safe and secure online.

## 🛠️ Project Structure
```
│
├── SecureHerExtension/      # Chrome extension source code
│   ├── popup.html          # Main HTML file for the popup interface
│   ├── popup.js            # JavaScript file handling the UI and interactions
│   └── styles.css          # CSS file for styling the extension
│
├── DetectionModelServer/   # Backend server for the ML model
│   ├── Online Harassment Detecting Models.ipynb            # Jupyter Notebook for the the Algorithms
|   ├── app.py                                              # Flask API serving the ML model
│   ├── model.pkl                                           # Pre-trained harassment detection model
│   └── requirements.txt                                    # Python dependencies
│
└── README.md               # Project documentation
```
### Key Features



-`Harassment Detection`: Using a TfidfVectorizer and LinearSVC machine learning model, the extension analyzes text to detect online harassment in real-time. Simply copy and paste the text into the extension’s input field, and SecureHer will flag any abusive language.

-`Link Security Check`: Identify if a link is malicious or safe to visit.
               
-`User-Friendly Interface`: A clean, feminine, and beautiful design for enhanced user interaction.






##  Environment set up
 - 1. Clone this repository:

```
git clone https://github.com/dummyysal/WieAct3.0-Tech-Challenge-SecureHer.git

```
- 2. Load the extension:
Open Chrome and navigate to chrome://extensions/.
Enable Developer mode.
Click on Load unpacked and select the extension/ folder.

- 3. Run the Flask server
on your Vscode terminal create venv environment then
```
pip install requirement.txt

```
then run the server

```
python DetectionModelServer/app.py

```
## 🛡️ Security & Privacy
We value your privacy! No personal data is shared or stored. The harassment detection model runs locally in your browser, ensuring that your data remains private.


## 🤝 Contributions
We’d love your help to make SecureHer better! Contributions can include:

🔧 Reporting bugs or issues
✨ Suggesting new features
📝 Improving documentation
