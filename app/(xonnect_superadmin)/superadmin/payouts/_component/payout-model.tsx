import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  PieChart, 
  Banknote, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Download,
  User,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

interface PayoutData {
  id: string;
  creatorName: string;
  creatorEmail: string;
  creatorAvatar?: string;
  creatorPhone?: string;
  amount: number;
  platformFee: number;
  creatorEarnings: number;
  paymentMethod: string;
  requestDate: string;
  processedDate?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    accountType: string;
    isVerified: boolean;
  };
  payoutNote?: string;
}

interface PayoutModalProps {
  payout: PayoutData | null;
  onClose: () => void;
//   onApprove: (payoutId: string, note?: string) => Promise<void>;
//   onReject: (payoutId: string, note?: string) => Promise<void>;
//   onDownload: (payoutId: string) => void;
}

const PayoutModal: React.FC<PayoutModalProps> = ({ 
  payout, 
  onClose, 
//   onApprove, 
//   onReject, 
//   onDownload 
}) => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectionNote, setRejectionNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!payout) return null;

  console.log('Payout Data:', payout);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'approved':
        return 'bg-blue-600/20 text-blue-400';
      case 'rejected':
        return 'bg-red-600/20 text-red-400';
      case 'processed':
        return 'bg-green-600/20 text-green-400';
      default:
        return 'bg-gray-600/20 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'processed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return null;
    }
  };

  const handleApproveClick = () => {
    setShowApproveModal(true);
    setError('');
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
    setError('');
  };

  const submitApproval = async () => {
    if (!approvalNote.trim()) {
      setError('Please add a note for approval');
      return;
    }

    setIsProcessing(true);
    try {
    //   await onApprove(payout.id, approvalNote);
      setShowApproveModal(false);
      setApprovalNote('');
    } catch (err) {
      setError('Failed to approve payout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const submitRejection = async () => {
    if (!rejectionNote.trim()) {
      setError('Please add a note for rejection');
      return;
    }

    setIsProcessing(true);
    try {
    //   await onReject(payout.id, rejectionNote);
      setShowRejectModal(false);
      setRejectionNote('');
    } catch (err) {
      setError('Failed to reject payout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Main Payout Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] hidden-scrollbar overflow-hidden m-4">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Payout Details</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Creator Information */}
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Creator Information
              </h4>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    {payout.creatorAvatar ? (
                      <img
                        src={payout.creatorAvatar}
                        alt={payout.creatorName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-foreground font-bold text-2xl">
                        {payout.creatorName.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Creator Name</p>
                      <p className="text-foreground font-semibold">{payout.creatorName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground font-semibold">{payout.creatorEmail}</p>
                      </div>
                    </div>
                    {payout.creatorPhone && (
                      <div>
                        <p className="text-muted-foreground text-sm">Phone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <p className="text-foreground font-semibold">{payout.creatorPhone}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground text-sm">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payout.status)}
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(payout.status)}`}>
                          {payout.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            {payout.bankDetails && (
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-green-400" />
                  Payout Account Details
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Bank Name</p>
                    <p className="text-foreground font-semibold text-lg">{payout.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Account Number</p>
                    <p className="text-foreground font-semibold text-lg font-mono">
                      ••••••••{payout.bankDetails.accountNumber.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Account Name</p>
                    <p className="text-foreground font-semibold text-lg">{payout.bankDetails.accountName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Account Type</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        payout.bankDetails.isVerified 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {payout.bankDetails.accountType}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payout.bankDetails.isVerified 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {payout.bankDetails.isVerified ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {payout.bankDetails.isVerified && (
                  <div className="mt-4 flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <p className="text-sm">This account has been verified for payouts</p>
                  </div>
                )}
              </div>
            )}

            {/* Payout Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-foreground">${payout.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Fee (10%)</p>
                    <p className="text-2xl font-bold text-red-400">${payout.platformFee.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-green-600/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Creator Earnings (90%)</p>
                    <p className="text-2xl font-bold text-green-400">${payout.creatorEarnings.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Timeline */}
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Payment Timeline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Request Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <p className="text-foreground font-semibold">{payout.requestDate}</p>
                  </div>
                </div>
                {payout.processedDate && (
                  <div>
                    <p className="text-muted-foreground text-sm">Processed Date</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <p className="text-foreground font-semibold">{payout.processedDate}</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground text-sm">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <p className="text-foreground font-semibold">{payout.paymentMethod}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Transaction ID</p>
                  <p className="text-foreground font-semibold font-mono text-sm">
                    {payout.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Existing Note */}
            {payout.payoutNote && (
              <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-4 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Admin Note
                </h4>
                <p className="text-yellow-300">{payout.payoutNote}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-border">
              <button
                // onClick={() => onDownload(payout.id)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              
              {payout.status === 'pending' && (
                <>
                  <button
                    onClick={handleRejectClick}
                    className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-400 hover:bg-red-600/10 rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Payout
                  </button>
                  <button
                    onClick={handleApproveClick}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-foreground rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Payout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approve Payout Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 m-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">Approve Payout</h4>
            <p className="text-muted-foreground text-sm mb-6">
              Add a note for approving this payout to ${payout.creatorName}
            </p>
            
            {error && (
              <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-muted-foreground text-sm mb-2">
                Approval Note <span className="text-red-400">*</span>
              </label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                placeholder="Enter a note explaining why you're approving this payout..."
                className="w-full h-32 bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
                required
              />
              <p className="text-gray-500 text-xs mt-2">This note will be visible to the creator</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setApprovalNote('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={submitApproval}
                disabled={isProcessing || !approvalNote.trim()}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm Approval
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Payout Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 m-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">Reject Payout</h4>
            <p className="text-muted-foreground text-sm mb-6">
              Add a note for rejecting this payout to ${payout.creatorName}
            </p>
            
            {error && (
              <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-muted-foreground text-sm mb-2">
                Rejection Reason <span className="text-red-400">*</span>
              </label>
              <textarea
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="Explain why you're rejecting this payout..."
                className="w-full h-32 bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
                required
              />
              <p className="text-gray-500 text-xs mt-2">This note will be visible to the creator</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionNote('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                disabled={isProcessing || !rejectionNote.trim()}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Confirm Rejection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayoutModal;
