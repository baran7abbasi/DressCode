from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic

##setx ANTHROPIC_API_KEY "your-api-key-here"
#client = anthropic.Anthropic()

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="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",
)

app = Flask(__name__)
CORS(app)

def generateFit(data):
    data_top = data.get('top', '') or ' '
    data_bottom = data.get('bottom', '') or ' '
    data_shoes = data.get('shoes', '') or ' '
    data_jacket = data.get('jacket', '') or ' '
    data_accessory = data.get('accessory', '') or ' '
    data_occasion = data.get('occasion', '') or ' '
    data_weather = data.get('weather', '') or ' '

    
    message = client.messages.create(
        model="claude-3-sonnet-20240229",  # Use the current model string
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
                        Only use provided items, please, but be stylish.

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
            
    return message.content[0].text
    """
    except Exception as e:
        print(f"Error generating fit: {e}")
        return {"choices": [{"message": {"content": "Error occurred while generating the outfit."}}]}

    """
    #print(message.content[0].text)

@app.route('/chat', methods=['POST'])
def generate_outfit():
    data = request.json
    outfit = generateFit(data)
    return jsonify({
        "response": outfit
    })

"""
def generate_image_with_openai(prompt):
    # Call to OpenAI API to generate an image
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"  # Adjust the size as needed
    )
    return response['data'][0]['url']  # Returns the image URL
"""

"""    
def main():

    user_item = input("Please enter your main clothing item: ")
    user_occasion = input("Please enter the occasion: ")
    user_weather = input("Please enter the weather conditions: ")
    user_style = input("Please enter your style preference: ")
    user_color = input("Please enter your color preference: ")
    text_output = generateFit(user_item, user_occasion, user_weather, user_style, user_color)
    #text_output = generateFit("jeans", "lecture", "sunny", "casual", "jade")
    print("Generated Text:", text_output)

    #image_url = generate_image_with_openai(text_output)
    #print("Generated Image URL:", image_url)
"""
    
if __name__ == "__main__":
    app.run(debug=True)
    #generate_outfit()

#print(message.content)

#generateFit(user_item, user_occasion, user_weather, user_style, user_color)
#generateFit("baggy jeans", "college lecture", "warm and sunny", "casual and edgy", "jade green")