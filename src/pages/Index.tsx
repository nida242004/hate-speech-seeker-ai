
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  Brain, 
  Database, 
  Zap,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number;
    features: string[];
    risk_level: 'low' | 'medium' | 'high';
  } | null>(null);

  // Mock model metrics
  const modelMetrics = {
    accuracy: 94.7,
    precision: 92.3,
    recall: 96.1,
    f1Score: 94.2
  };

  const featureEngineering = [
    { name: 'N-grams', description: 'Character and word-level patterns', importance: 85 },
    { name: 'TF-IDF', description: 'Term frequency analysis', importance: 78 },
    { name: 'Sentiment', description: 'Emotional tone detection', importance: 82 },
    { name: 'Linguistic', description: 'POS tags, syntax patterns', importance: 71 },
    { name: 'Contextual', description: 'Word embeddings (BERT)', importance: 91 }
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      // Mock hate speech detection logic
      const hateKeywords = ['hate', 'stupid', 'idiot', 'kill', 'die', 'worst'];
      const toxicityScore = hateKeywords.reduce((score, keyword) => {
        return score + (inputText.toLowerCase().includes(keyword) ? 20 : 0);
      }, Math.random() * 30);

      const confidence = Math.min(85 + Math.random() * 15, 99);
      const isHateSpeech = toxicityScore > 40;
      
      setResult({
        prediction: isHateSpeech ? 'Hate Speech Detected' : 'Safe Content',
        confidence: confidence,
        features: ['profanity_detected', 'negative_sentiment', 'personal_attack'].slice(0, isHateSpeech ? 3 : 1),
        risk_level: toxicityScore > 60 ? 'high' : toxicityScore > 30 ? 'medium' : 'low'
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HateGuard AI</h1>
                <p className="text-sm text-gray-600">Advanced Hate Speech Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                94.7% Accuracy
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="detector" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="detector">Live Detector</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* Live Detector Tab */}
          <TabsContent value="detector" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Text Analysis</span>
                    </CardTitle>
                    <CardDescription>
                      Enter text below to analyze for potential hate speech content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Enter text to analyze for hate speech..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <Button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full"
                    >
                      {isAnalyzing ? (
                        <>
                          <Brain className="h-4 w-4 mr-2 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Analyze Text
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {result.prediction.includes('Hate') ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <span>Detection Result</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className={`text-lg font-semibold ${
                          result.prediction.includes('Hate') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {result.prediction}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Confidence: {result.confidence.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Level</span>
                          <Badge variant={
                            result.risk_level === 'high' ? 'destructive' :
                            result.risk_level === 'medium' ? 'secondary' : 'outline'
                          }>
                            {result.risk_level.toUpperCase()}
                          </Badge>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      {result.features.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Detected Features:</p>
                          <div className="space-y-1">
                            {result.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Texts Analyzed Today</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hate Speech Detected</span>
                      <span className="font-semibold text-red-600">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Model Uptime</span>
                      <span className="font-semibold text-green-600">99.9%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Methodology Tab */}
          <TabsContent value="methodology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Methodology</CardTitle>
                <CardDescription>
                  Based on state-of-the-art machine learning pipeline for hate speech detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Database className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Data Acquisition</h3>
                    <p className="text-sm text-gray-600">
                      Crawling social media data, hashtags, profiles, and trigger events for comprehensive dataset
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Filter className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Pre-processing</h3>
                    <p className="text-sm text-gray-600">
                      Lower-casing, stemming, punctuation removal, URL cleanup, and stop-word filtering
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Feature Engineering</h3>
                    <p className="text-sm text-gray-600">
                      N-grams, TF-IDF, word embeddings, and linguistic meta-information extraction
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Model Training</h3>
                    <p className="text-sm text-gray-600">
                      Ensemble methods, deep neural networks, and transformer-based models
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                      <Target className="h-8 w-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold">Model Evaluation</h3>
                    <p className="text-sm text-gray-600">
                      Cross-validation, accuracy, F-measure, recall, and precision testing
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold">Optimization</h3>
                    <p className="text-sm text-gray-600">
                      Parameter tuning, retraining, and continuous model management
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Model Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{modelMetrics.accuracy}%</div>
                  <Progress value={modelMetrics.accuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Precision</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{modelMetrics.precision}%</div>
                  <Progress value={modelMetrics.precision} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Recall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{modelMetrics.recall}%</div>
                  <Progress value={modelMetrics.recall} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">F1-Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{modelMetrics.f1Score}%</div>
                  <Progress value={modelMetrics.f1Score} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance Details</CardTitle>
                <CardDescription>
                  Comprehensive evaluation metrics and cross-validation results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Training Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Training Samples:</span>
                        <span>150,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Validation Samples:</span>
                        <span>30,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Test Samples:</span>
                        <span>20,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Time:</span>
                        <span>4.2 hours</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Model Architecture</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Model:</span>
                        <span>BERT + Ensemble</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parameters:</span>
                        <span>110M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Layers:</span>
                        <span>12 Transformer</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inference Time:</span>
                        <span>~50ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Engineering Pipeline</CardTitle>
                <CardDescription>
                  Advanced feature extraction techniques for optimal hate speech detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {featureEngineering.map((feature, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{feature.name}</h4>
                        <Badge variant="outline">{feature.importance}% importance</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                      <Progress value={feature.importance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Text Preprocessing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Lowercasing normalization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Punctuation removal</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>URL and mention cleanup</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Stop-word filtering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Stemming and lemmatization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Contextual word embeddings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Sentiment polarity scores</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>POS tag distributions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Readability metrics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Profanity detection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
