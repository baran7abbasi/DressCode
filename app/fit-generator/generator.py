from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic

app = Flask(__name__)

# Simple CORS configuration - allow all origins for testing
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Add these headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

client = anthropic.Anthropic(
    api_key="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",
)

def generateFit(data):
    # Your existing generateFit function remains the same
    data_top = data.get('top', '') or ' '
    data_bottom = data.get('bottom', '') or ' '
    data_shoes = data.get('shoes', '') or ' '
    data_jacket = data.get('jacket', '') or ' '
    data_accessory = data.get('accessory', '') or ' '
    data_occasion = data.get('occasion', '') or ' '
    data_weather = data.get('weather', '') or ' '
    
    try:
        message = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            temperature=0.8,
            system="You are a fashion icon. You understand color theory, the 2/3rds rule, the 7-point outfit goal, and current fashion trends.",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"""Using '{data_top}', suggest a cohesive outfit 
                            for a {data_occasion} on a {data_weather} day. If presented with a list for a variable, choose one that matches the outfit.

                            One of the items, {data_top}, {data_bottom}, {data_jacket}, {data_shoes}, {data_accessory} will only have one item in the string, so use that. The others will have multiple pieces in the string and will
                            require you to choose from one of the many provided options in the passed in value.
                            Only use provided items, please, but be stylish and explain your choice in the end.

                            Create a fit with top, bottom, shoes, and an accessory, using the selected item
                            the output should be in the following format:
                            Occasion: '{data_occasion}'
                            Weather: '{data_weather}'
                            Top: '{data_top}'
                            Bottoms: '{data_bottom}'
                            Jacket: '{data_jacket}'
                            Shoes: '{data_shoes}'
                            Accessory: '{data_accessory}'"""
                        }
                    ]
                }
            ]
        )
        print(f"" + message.content[0].text)
        return message.content[0].text
    except Exception as e:
        print(f"Error generating fit: {e}")
        return "Error occurred while generating the outfit."

@app.route('/chat', methods=['POST', 'OPTIONS'])
def generate_outfit():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.json
        outfit = generateFit(data)
        return jsonify({
            "response": outfit
        })
    except Exception as e:
        print(f"Error in generate_outfit: {e}")
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    # Run in debug mode and allow all hosts
    app.run(debug=True, host='0.0.0.0', port=5002)
