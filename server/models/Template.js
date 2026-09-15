const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['birthday', 'anniversary', 'promotion', 'retirement', 'general'],
    default: 'general'
  },
  
  // Design padrão
  defaultColors: {
    background: { type: String, default: '#ffffff' },
    text: { type: String, default: '#000000' },
    accent: { type: String, default: '#FFD700' }
  },
  
  defaultLayout: {
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 },
    photoSize: { type: String, default: 'medium' },
    photoPosition: { type: String, default: 'center' }
  },
  
  // Background options
  backgroundOptions: [String],
  
  // Elementos festivos
  festiveElements: {
    enabled: { type: Boolean, default: true },
    defaultStyle: String,
    availableStyles: [String]
  },
  
  // Logo placement
  logoPlacement: {
    position: { type: String, enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'hidden'], default: 'top-left' },
    size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
  },
  
  // Text zones
  textZones: [{
    name: String,
    type: String,
    placeholder: String,
    maxLength: Number,
    fontSize: Number,
    fontFamily: String,
    alignment: String
  }],
  
  // Preview e thumbnail
  previewUrl: String,
  thumbnailUrl: String,
  
  // Compatibilidade
  isResponsive: { type: Boolean, default: true },
  mobileOptimized: { type: Boolean, default: true },
  
  // Status
  isActive: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false },
  
  // Criador
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);
