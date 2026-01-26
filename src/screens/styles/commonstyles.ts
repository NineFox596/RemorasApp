import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },

  card: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },

  textMuted: {
    color: '#6b7280',
  },

  successButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },

  successButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  expand: {
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderColor: '#e5e7eb',
},
problemDescription: {
  marginTop: 8,
  marginBottom: 10,
  color: '#374151',
},

status: {
  fontWeight: 'bold',
},

statusOk: {
  color: '#16a34a', // verde
},

statusPending: {
  color: '#dc2626', // rojo
},
// ...existing code...
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#222', // or your preferred color
},
// ...existing code...
sectionTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
  marginTop: 8,
  marginBottom: 4,
},
// ...existing code...
userBox: {
  backgroundColor: '#f5f5f5',
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  borderLeftWidth: 4,
  borderLeftColor: '#007AFF',
},
label: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 6,
  marginTop: 12,
  color: '#111827',
},
input: {
  borderWidth: 1,
  borderColor: '#d1d5db',
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  backgroundColor: '#fff',
},
// ...existing code...




// ...existing code...

/* ===== COMPONENTES ===== */

componentCard: {
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 14,
  marginBottom: 14,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
},

componentHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

componentTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#111827',
},

componentSubtitle: {
  fontSize: 14,
  color: '#6b7280',
},

componentDetails: {
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#e5e7eb',
},

componentRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 6,
},

componentLabel: {
  color: '#6b7280',
  fontSize: 14,
},

componentValue: {
  color: '#111827',
  fontWeight: '500',
},

});

export default commonStyles;
