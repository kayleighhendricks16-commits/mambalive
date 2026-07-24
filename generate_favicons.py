from PIL import Image
img = Image.open('mambalogo.png').convert('RGBA')
sizes = {
    'favicon-32.png': 32,
    'favicon-192.png': 192,
    'apple-touch-icon.png': 180,
}
for name, size in sizes.items():
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(name, format='PNG', optimize=True)
    print(f'Saved {name}')
ico_sizes = [(16,16), (32,32), (48,48)]
ico_images = [img.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
ico_images[0].save('favicon.ico', format='ICO', sizes=ico_sizes)
print('Saved favicon.ico')