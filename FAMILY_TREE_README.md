# Family Tree Chart

This is a family tree chart that matches the design from the reference image, featuring 5 generations with circular nodes and proper connections.

## Features

- **5 Generations**: From "My Name" to "Great Great Grandparents"
- **Circular Nodes**: Each person is represented by a circular photo or placeholder
- **Photo Integration**: First 3 generations use actual photos from your assets
- **Empty Placeholders**: Generations 4 and 5 use empty circles with different border styles
- **Connection Lines**: Thin black lines connecting family members across generations
- **Responsive Design**: Adapts to different screen sizes
- **Instruction Tooltip**: Blue lightbulb icon with helpful text

## File Structure

- `family-tree.html` - The main HTML file for the family tree
- `family-tree.css` - Styling for the family tree layout and connections
- `assets/photos/` - Directory containing family photos

## How to Customize

### 1. Add Photos to Empty Nodes

To add photos to the empty circles in generations 4 and 5:

1. Place your photo files in the `assets/photos/` directory
2. Update the HTML to replace empty nodes with photo nodes:

```html
<!-- Replace this: -->
<div class="person-photo empty-photo solid-border"></div>

<!-- With this: -->
<div class="person-photo">
    <img src="assets/photos/your-photo.jpg" alt="Person's Name">
</div>
```

### 2. Update Names and Labels

Change the person labels to match your actual family members:

```html
<div class="person-label">Actual Person's Name</div>
```

### 3. Add More Generations

To add more generations, follow the pattern:

```html
<!-- Generation 6: Great Great Great Grandparents -->
<div class="generation gen-6">
    <div class="person-node">
        <div class="person-photo empty-photo dotted-border"></div>
        <div class="person-label">Great Great Great Grandfather's Name</div>
    </div>
    <!-- Add more nodes as needed -->
</div>
```

### 4. Customize Styling

Modify `family-tree.css` to change:
- Colors and borders
- Node sizes
- Connection line styles
- Layout spacing
- Fonts and typography

## Current Structure

- **Generation 1**: Dandu Mahesh Reddy (with photo)
- **Generation 2**: Parents (Dandu Manohar Reddy + Mother)
- **Generation 3**: Grandparents (4 people with photos)
- **Generation 4**: Great Grandparents (8 empty circles with solid borders)
- **Generation 5**: Great Great Grandparents (16 empty circles with dashed borders)

## Navigation

The family tree is accessible from the main navigation menu and footer quick links on your main website.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- CSS Grid and Flexbox for layout

## Tips

1. **Photo Sizing**: Photos are automatically cropped to fit the circular nodes
2. **Responsive**: On smaller screens, the tree stacks vertically for better mobile viewing
3. **Customization**: The CSS uses CSS variables for easy color and size adjustments
4. **Accessibility**: Alt text should be added to all photos for screen readers

## Support

For questions or customization help, refer to the CSS comments or modify the HTML structure as needed.
