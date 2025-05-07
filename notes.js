make square get bigger on resize bigger


ChatGPT said:
To make the square scale proportionally with the canvas size, you can calculate its size as a fraction of the canvas dimensions. Here's an updated version of the previous example:

✅ Responsive Canvas with Resizing Square
html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Responsive Canvas</title>
  <style>
    html, body {
      margin: 0;
      height: 100%;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw(width, height);
    }

    function draw(width, height) {
      ctx.clearRect(0, 0, width, height);

      const size = Math.min(width, height) * 0.3; // Square is 30% of smaller screen dimension
      const x = (width - size) / 2;
      const y = (height - size) / 2;

      ctx.fillStyle = 'cornflowerblue';
      ctx.fillRect(x, y, size, size);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  </script>
</body>
</html>