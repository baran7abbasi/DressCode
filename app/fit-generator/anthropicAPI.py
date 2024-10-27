from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic

##setx ANTHROPIC_API_KEY "your-api-key-here"
#client = anthropic.Anthropic()

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="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",
)

app=Flask(__name__)

def generateFit(data):
    data_item = data.get('Item')
    data_occasion = data.get('Occasion')
    data_weather = data.get('Weather')
    data_style = data.get('Style')
    data_color = data.get('Color')

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


    message = client.messages.create(
        #model="claude-3-5-sonnet-20241022",
        model="claude-3-opus-20240229",
        max_tokens=1000,
        temperature=0.6,
        system="You are a fashion icon. You are the moment. You understand color theory, the 2/3rds rule, the 7-point outfit goal, and current fashion trends.Provide the best fashion advice ever to create cohesive outfits that meet the set qualities.\n",
        message = client.messages.create[
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "content": f"Usising '{data_item}', suggest a cohesive outfit "
                                    f"for a {data_occasion} on a {data_weather} day. The style should be {data_style} "
                                    f"and incorporate the color {data_color}. Provide styling tips and accessories."
                                    f"the output should be in the following format"
                                    f"Item: '{data_item}'\nOccasion: '{data_occasion}'\nWeather: '{data_weather}'\nStyle: '{data_style}\n'Color: '{data_color}'"
    
                    }
                ]
            }
        ]
        
    ) 
    return message

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