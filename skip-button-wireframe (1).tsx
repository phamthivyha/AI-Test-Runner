import { useState } from 'react';
import { AlertTriangle, SkipForward, Send, Clock, CheckCircle, XCircle, X, MessageSquare, Square, Lightbulb, Play } from 'lucide-react';

export default function SkipButtonWireframe() {
  const [activeTab, setActiveTab] = useState('aiLog');
  const [bannerVisible, setBannerVisible] = useState(true);
  const [stepSkipped, setStepSkipped] = useState(false);
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [testCancelled, setTestCancelled] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const quickReplies = [
    "Check for logout button",
    "Verify URL contains /dashboard",
    "Look for user avatar",
    "Wait 5 more seconds"
  ];

  const handleSkip = () => {
    setStepSkipped(true);
    setInputSubmitted(false);
    setTestCancelled(false);
    setBannerVisible(false);
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setTestCancelled(true);
    setStepSkipped(false);
    setInputSubmitted(false);
    setBannerVisible(false);
    setShowCancelDialog(false);
  };

  const handleSubmitInput = (text) => {
    const inputText = text || userInput;
    if (inputText.trim()) {
      setSubmittedText(inputText);
      setInputSubmitted(true);
      setStepSkipped(false);
      setTestCancelled(false);
      setBannerVisible(false);
      setUserInput('');
    }
  };

  const handleReset = () => {
    setStepSkipped(false);
    setInputSubmitted(false);
    setTestCancelled(false);
    setBannerVisible(true);
    setShowCancelDialog(false);
    setUserInput('');
    setSubmittedText('');
  };

  const isResolved = stepSkipped || inputSubmitted || testCancelled;

  return (
    <div className="bg-gray-100 min-h-screen p-4 relative">
      
      {/* CONFIRMATION DIALOG */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-900 text-lg">Cancel This Test Case?</h3>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">
                This will stop execution of <strong>"TC-516326 Navigation Link"</strong> only.
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="text-gray-600 mb-2 font-medium">What happens:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Completed steps will be saved</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Current step marked as cancelled</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Remaining steps will not run</span>
                  </li>
                  <li className="flex items-center gap-2 bg-blue-50 p-2 rounded -mx-2">
                    <Play className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-blue-700 font-medium">Other test cases in queue will continue</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t">
              <button 
                onClick={() => setShowCancelDialog(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
              >
                Go Back
              </button>
              <button 
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Cancel This Test Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-t-lg border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Executions</span>
            <span>›</span>
            <span>Test Runs</span>
            <span>›</span>
            <span className="font-medium text-gray-900">Authentication: Daily Regression</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Test Case 1 of 12</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${testCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {testCancelled ? '● Cancelled' : '● Running'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-b-lg shadow-sm">
        
        {/* Persistent Banner - when stuck */}
        {bannerVisible && !isResolved && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-amber-900">Step 3 needs your attention</p>
                  <p className="text-sm text-amber-700 mb-3">"User should be logged in successfully" - AI cannot verify login status</p>
                  
                  {/* QUICK REPLY CHIPS */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">Quick suggestions:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubmitInput(reply)}
                          className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-full text-sm hover:bg-amber-100 hover:border-amber-400 transition-colors shadow-sm"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSubmitInput()}
                          placeholder="Or type your own guidance..."
                          className="w-full px-3 py-2.5 pr-10 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                        />
                        <button 
                          onClick={() => handleSubmitInput()}
                          disabled={!userInput.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-600 hover:text-amber-800 disabled:text-amber-300"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-amber-200">
                      <span className="text-sm text-amber-700">Or:</span>
                      <button 
                        onClick={handleSkip}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-medium border border-gray-300 text-sm"
                      >
                        <SkipForward className="w-4 h-4" />
                        Skip Step
                      </button>
                      <button 
                        onClick={handleCancelClick}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 font-medium border border-red-300 text-sm"
                      >
                        <Square className="w-4 h-4" />
                        Cancel This Test Case
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-1.5 text-amber-500 hover:bg-amber-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Success Banner after input */}
        {inputSubmitted && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">Input received! AI continuing...</p>
                  <p className="text-sm text-green-600">Your guidance: "{submittedText}"</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-sm text-green-700 underline hover:text-green-900">
                Reset Demo
              </button>
            </div>
          </div>
        )}

        {/* Banner after skip */}
        {stepSkipped && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkipForward className="w-5 h-5 text-blue-600" />
                <p className="text-blue-800 font-medium">Step skipped. AI continuing to next step...</p>
              </div>
              <button onClick={handleReset} className="text-sm text-blue-700 underline hover:text-blue-900">
                Reset Demo
              </button>
            </div>
          </div>
        )}

        {/* Banner after stop */}
        {testCancelled && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Square className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-800 font-medium">Test case cancelled</p>
                  <p className="text-sm text-red-600">TC-516326 cancelled. Moving to next test case (2 of 12)...</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-sm text-red-700 underline hover:text-red-900">
                Reset Demo
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b px-4">
          <div className="flex gap-1">
            {['General', 'Test Step', 'AI Log'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab === 'Test Step' ? 'testStep' : tab === 'AI Log' ? 'aiLog' : 'general')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  (tab === 'Test Step' && activeTab === 'testStep') ||
                  (tab === 'AI Log' && activeTab === 'aiLog') ||
                  (tab === 'General' && activeTab === 'general')
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {tab === 'AI Log' && !isResolved && (
                  <span className="ml-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">!</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          
          {/* Test Step Tab */}
          {activeTab === 'testStep' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Navigate to login page</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Passed</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Enter username "jsmith"</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Passed</span>
              </div>

              {/* Step 3 - Stuck */}
              <div className={`rounded-lg border-2 ${
                testCancelled ? 'bg-red-50 border-red-200' : 
                isResolved ? 'bg-gray-50 border-gray-200' : 
                'bg-amber-50 border-amber-300'
              }`}>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {stepSkipped ? (
                        <SkipForward className="w-5 h-5 text-gray-400" />
                      ) : inputSubmitted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : testCancelled ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      )}
                      <div>
                        <span className="text-sm font-medium">User should be logged in successfully</span>
                        {!isResolved && (
                          <p className="text-xs text-amber-600 mt-0.5">⏳ Waiting for your input...</p>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      stepSkipped ? 'bg-gray-200 text-gray-600' : 
                      testCancelled ? 'bg-red-100 text-red-700' :
                      inputSubmitted ? 'bg-green-100 text-green-700' :
                      'bg-amber-200 text-amber-800'
                    }`}>
                      {stepSkipped ? 'Skipped' : testCancelled ? 'Cancelled' : inputSubmitted ? 'Resolved' : 'Stuck'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border ${testCancelled ? 'opacity-40' : 'opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Verify dashboard is displayed</span>
                </div>
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">
                  {testCancelled ? 'Not Run' : 'Pending'}
                </span>
              </div>
            </div>
          )}

          {/* AI Log Tab */}
          {activeTab === 'aiLog' && (
            <div className="space-y-1 font-mono text-sm">
              <div className="flex gap-3 py-1.5 text-gray-600">
                <span className="text-gray-400 w-20 shrink-0">10:32:01</span>
                <span>🚀 Starting test execution...</span>
              </div>
              <div className="flex gap-3 py-1.5 text-gray-600">
                <span className="text-gray-400 w-20 shrink-0">10:32:02</span>
                <span>✅ Step 1: Navigate to login page - Passed</span>
              </div>
              <div className="flex gap-3 py-1.5 text-gray-600">
                <span className="text-gray-400 w-20 shrink-0">10:32:05</span>
                <span>✅ Step 2: Enter username "jsmith" - Passed</span>
              </div>
              <div className="flex gap-3 py-1.5 text-gray-600">
                <span className="text-gray-400 w-20 shrink-0">10:32:08</span>
                <span>🔍 Step 3: Verifying login status...</span>
              </div>
              <div className="flex gap-3 py-1.5 text-amber-600">
                <span className="text-gray-400 w-20 shrink-0">10:32:12</span>
                <span>⚠️ Cannot locate expected element "Welcome, jsmith"</span>
              </div>

              {/* Stuck Log Entry */}
              {!isResolved ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3">
                  <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-sans">Step stuck - Need your help!</span>
                  </div>
                  <p className="text-amber-600 font-sans text-sm mb-4">I can't find the expected login confirmation. How should I verify the user is logged in?</p>
                  
                  {/* Quick Replies in AI Log */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700 font-sans">Suggestions:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubmitInput(reply)}
                          className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-full text-xs hover:bg-amber-100 font-sans"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitInput()}
                        placeholder="Or type your own..."
                        className="w-full px-3 py-2 pr-10 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white font-sans"
                      />
                      <button 
                        onClick={() => handleSubmitInput()}
                        disabled={!userInput.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-amber-600 hover:text-amber-800 disabled:text-amber-300"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
                    <span className="text-sm text-amber-700 font-sans">Or:</span>
                    <button onClick={handleSkip} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium border border-gray-300 font-sans">
                      <SkipForward className="w-4 h-4" />
                      Skip Step
                    </button>
                    <button onClick={handleCancelClick} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium border border-red-300 font-sans">
                      <Square className="w-4 h-4" />
                      Cancel This Test Case
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {inputSubmitted && (
                    <>
                      <div className="flex gap-3 py-1.5 text-blue-600">
                        <span className="text-gray-400 w-20 shrink-0">10:32:30</span>
                        <span>💬 User: "{submittedText}"</span>
                      </div>
                      <div className="flex gap-3 py-1.5 text-green-600">
                        <span className="text-gray-400 w-20 shrink-0">10:32:31</span>
                        <span>✅ Got it! Proceeding...</span>
                      </div>
                    </>
                  )}
                  {stepSkipped && (
                    <div className="flex gap-3 py-1.5 text-blue-600">
                      <span className="text-gray-400 w-20 shrink-0">10:32:30</span>
                      <span>⏭️ Step 3 skipped by user</span>
                    </div>
                  )}
                  {testCancelled && (
                    <>
                      <div className="flex gap-3 py-1.5 text-red-600">
                        <span className="text-gray-400 w-20 shrink-0">10:32:30</span>
                        <span>🛑 Test case cancelled by user</span>
                      </div>
                      <div className="flex gap-3 py-1.5 text-gray-500">
                        <span className="text-gray-400 w-20 shrink-0">10:32:31</span>
                        <span>📊 Results saved. Moving to test case 2 of 12...</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="text-gray-500 text-sm">General test information...</div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">✨ Try These Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="border rounded-lg p-3 bg-purple-50 border-purple-200">
            <p className="font-medium text-purple-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Quick Suggestions
            </p>
            <p className="text-purple-600 mt-1 text-xs">Click a chip to send</p>
          </div>
          <div className="border rounded-lg p-3 bg-amber-50 border-amber-200">
            <p className="font-medium text-amber-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Custom Input
            </p>
            <p className="text-amber-600 mt-1 text-xs">Type your own guidance</p>
          </div>
          <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
            <p className="font-medium text-blue-800 flex items-center gap-2">
              <SkipForward className="w-4 h-4" />
              Skip Step
            </p>
            <p className="text-blue-600 mt-1 text-xs">Continue to next step</p>
          </div>
          <div className="border rounded-lg p-3 bg-red-50 border-red-200">
            <p className="font-medium text-red-800 flex items-center gap-2">
              <Square className="w-4 h-4" />
              Cancel Test Case
            </p>
            <p className="text-red-600 mt-1 text-xs">Shows confirmation dialog</p>
          </div>
        </div>
      </div>
    </div>
  );
}
