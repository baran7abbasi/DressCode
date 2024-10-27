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
    data_top = data.get('top', '')
    data_bottom = data.get('bottom', '')
    data_shoes = data.get('shoes', '')
    data_accessory = data.get('accessory', '')
    data_occasion = data.get('occasion', '')
    data_weather = data.get('weather', '')

    """
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input1: input1,
          input2: input2,
		  input3: input3,
		  input4: input4,
		  input5: input5
        }),
      });

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
        console.error('Error:', error);
        setResponse('Error occurred while fetching response');
    } finally {
        setLoading(false);
    }
    """

    try:
        message = client.messages.create(
            #model="claude-3-5-sonnet-20241022",
            model="claude-3-opus-20240229",
            max_tokens=1000,
            temperature=0.6,
            system="You are a fashion icon. You are the moment. You understand color theory, the 2/3rds rule, the 7-point outfit goal, and current fashion trends.Provide the best fashion advice ever to create cohesive outfits that meet the set qualities.\n",
            message = [
                {
                    "role": "system",
                    "content": "You are a fashion icon. You understand color theory, the 2/3rds rule, the 7-point outfit goal, and current fashion trends. Provide the best fashion advice ever to create cohesive outfits that meet the set qualities."
                },
                {
                    "role":"user",
                    "content": [
                        {
                            "type": "text",
                            "content": f"Using '{data_top}', suggest a cohesive outfit "
                                        f"for a {data_occasion} on a {data_weather} day. Create a fit with top, bottom, shoes, and an accessory"
                                        f"the output should be in the following format"
                                        f"Occasion: '{data_occasion}'\n"
                                        f"Weather: '{data_weather}'\n"
                                        f"Top: ' {data_top}\n'"
                                        f"Bottoms: '{data_bottom}'\n"
                                        f"Shoes: '{data_shoes}'\n"
                                        f"Accessory: '{data_accessory}'\n"
        
                        }
                    ]
                }
            ]
            
        ) 
        return message
    except Exception as e:
        print(f"Error generating fit: {e}")
        return {"choices": [{"message": {"content": "Error occurred while generating the outfit."}}]}

    #print(message.content[0].text)

@app.route('/chat', methods=['POST'])
def generate_outfit():
    data = request.json
    outfit = generateFit(data)
    return jsonify({
        "response": outfit['choices'][0]['message']['content']
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