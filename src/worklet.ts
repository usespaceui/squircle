export const workletCode = `
class SquirclePainter {
  static get inputProperties() {
    return ['--tw-squircle-w', '--tw-squircle-smooth'];
  }
  
  paint(ctx, size, properties) {
    const getProp = (name) => {
      const p = properties.get(name);
      return p ? p.toString().trim() : '';
    };
    
    const radiusStr = getProp('--tw-squircle-w');
    let radius = 0;
    if (radiusStr.endsWith('%')) {
      radius = (Math.min(size.width, size.height) * parseFloat(radiusStr)) / 100;
    } else {
      radius = parseFloat(radiusStr) || 0;
    }
    const smoothStr = getProp('--tw-squircle-smooth');
    let smooth = parseFloat(smoothStr);
    if (isNaN(smooth)) smooth = 0.6;
    
    radius = Math.min(radius, size.width / 2, size.height / 2);
    
    this.drawSquircle(ctx, size.width, size.height, radius, smooth);
    ctx.fillStyle = 'black';
    ctx.fill();
  }
  
  drawSquircle(ctx, width, height, radius, smooth) {
    const n = 2 + smooth * 2;
    const steps = 30;
    const step = Math.PI / 2 / steps;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = Math.PI / 2 - i * step;
      const X = radius * Math.pow(Math.cos(t), 2 / n);
      const Y = radius * Math.pow(Math.sin(t), 2 / n);
      const x = width - radius + X;
      const y = radius - Y;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let i = 0; i <= steps; i++) {
      const t = i * step;
      const X = radius * Math.pow(Math.cos(t), 2 / n);
      const Y = radius * Math.pow(Math.sin(t), 2 / n);
      ctx.lineTo(width - radius + X, height - radius + Y);
    }
    for (let i = 0; i <= steps; i++) {
      const t = Math.PI / 2 - i * step;
      const X = radius * Math.pow(Math.cos(t), 2 / n);
      const Y = radius * Math.pow(Math.sin(t), 2 / n);
      ctx.lineTo(radius - X, height - radius + Y);
    }
    for (let i = 0; i <= steps; i++) {
      const t = i * step;
      const X = radius * Math.pow(Math.cos(t), 2 / n);
      const Y = radius * Math.pow(Math.sin(t), 2 / n);
      ctx.lineTo(radius - X, radius - Y);
    }
    ctx.closePath();
  }
}

class SquircleBorderPainter extends SquirclePainter {
  static get inputProperties() {
    return [
      '--tw-squircle-w', 
      '--tw-squircle-smooth',
      'border-top-width',
      'border-top-color'
    ];
  }
  
  paint(ctx, size, properties) {
    const getProp = (name) => {
      const p = properties.get(name);
      return p ? p.toString().trim() : '';
    };

    const radiusStr = getProp('--tw-squircle-w');
    let radius = 0;
    if (radiusStr.endsWith('%')) {
      radius = (Math.min(size.width, size.height) * parseFloat(radiusStr)) / 100;
    } else {
      radius = parseFloat(radiusStr) || 0;
    }
    const smoothStr = getProp('--tw-squircle-smooth');
    let smooth = parseFloat(smoothStr);
    if (isNaN(smooth)) smooth = 0.6;
    
    radius = Math.min(radius, size.width / 2, size.height / 2);
    
    const bwStr = getProp('border-top-width');
    const bw = parseFloat(bwStr) || 0;
    
    if (bw <= 0) return;
    
    let color = getProp('border-top-color');
    if (!color) color = 'black';
    
    this.drawSquircle(ctx, size.width, size.height, radius, smooth);
    
    ctx.lineWidth = bw * 2;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

registerPaint('squircle', SquirclePainter);
registerPaint('squircle-border', SquircleBorderPainter);
`;
