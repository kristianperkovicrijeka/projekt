from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/index.html', methods=['GET'])
def dohvati_vrijeme():
    latitude = 45.327 # Koordinate za Rijeku
    longitude = 14.442
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    
    try:
        response = requests.get(url)
        data = response.json()
        current_weather = data.get("current_weather", {})
        
        return jsonify({
            "grad": "Rijeka",
            "temperatura": current_weather.get("temperature"),
            "brzina_vjetra": current_weather.get("windspeed"),
            "status": "Uspješno dohvaćeno!"
        })
    except Exception as e:
        return jsonify({
            "error": "Nije moguće dohvatiti podatke o vremenu.",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)