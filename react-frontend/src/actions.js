export async function fetchNamedEntities(input) {
    const response = await fetch('http://localhost:5000/get_entities', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "text": input })
    })
    if (!response.ok) {
        throw new Error('Something went wrong! Please try again')
    } else {
        return response.json()
    }
}