const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  
  // Colaborador
  employee: {
    name: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    position: String,
    department: String
  },
  
  // Data e celebração
  celebrationDate: {
    type: Date,
    required: true
  },
  celebrationType: {
    type: String,
    enum: ['birthday', 'anniversary', 'promotion', 'retirement', 'other'],
    default: 'birthday'
  },
  
  // Mensagem personalizada
  message: {
    type: String,
    maxlength: 500
  },
  
  // Design
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  accentColor: {
    type: String,
    default: '#FFD700'
  },
  backgroundImage: {
    type: String,
    enum: ['wheat', 'lca-building', 'custom', 'none'],
    default: 'none'
  },
  customBackground: String,
  
  // Logos e elementos
  companyLogo: String,
  festiveElements: {
    type: Boolean,
    default: true
  },
  elementStyle: {
    type: String,
    enum: ['balloons', 'confetti', 'fireworks', 'mixed'],
    default: 'mixed'
  },
  
  // Resolved content (for PDF generation)
  layout: {
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 },
    dpi: { type: Number, default: 300 }
  },
  
  // Arquivo gerado
  pdfUrl: String,
  thumbnailUrl: String,
  webViewUrl: String,
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'processing', 'ready', 'published', 'archived'],
    default: 'draft'
  },
  
  // Compartilhamento
  sharing: {
    isPublic: { type: Boolean, default: false },
    publicLink: String,
    sharedWith: [{
      userId: mongoose.Schema.Types.ObjectId,
      sharedAt: Date
    }],
    socialPosts: [{
      platform: String,
      postId: String,
      sharedAt: Date,
      url: String
    }]
  },
  
  // Analytics
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  lastViewedAt: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Índices para melhor performance
posterSchema.index({ userId: 1, createdAt: -1 });
posterSchema.index({ 'sharing.isPublic': 1 });
posterSchema.index({ status: 1 });

module.exports = mongoose.model('Poster', posterSchema);
