export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
      try {
        const response = await fetch('https://8dae0489-c7f1-4675.gradio.live/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Network response from external API was not ok');
        }
  
        const responseData = await response.json();
        res.status(200).json(responseData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ message: 'Error posting data to external API' });
      }  
    } else {
      res.status(405).json({ message: 'Method not allowed' }); // 405 Method Not Allowed
    }
  }