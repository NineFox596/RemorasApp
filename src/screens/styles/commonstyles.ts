import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  /* ===== SCREEN / LAYOUT ===== */
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },

  /* ===== TEXTOS GENERALES ===== */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
    color: '#111827',
  },

  meta: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },

  textMuted: {
    color: '#6b7280',
  },

  warningButton: {
  flex: 1,
  backgroundColor: '#f39c12',
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: 'center',
},

warningButtonText: {
  color: 'white',
  fontWeight: 'bold',
},


  /* ===== CARDS ===== */
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

  expand: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },

  /* ===== ESTADOS ===== */
  status: {
    fontWeight: 'bold',
  },

  statusOk: {
    color: '#16a34a',
  },

  statusPending: {
    color: '#dc2626',
  },

  problemDescription: {
    marginTop: 8,
    marginBottom: 10,
    color: '#374151',
  },

  /* ===== BOTONES ===== */
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

  addButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  confirmButton: {
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },

  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  cancelText: {
    textAlign: 'center',
    color: '#dc2626',
    marginTop: 8,
  },

  /* ===== INPUTS / SELECT ===== */
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
  },

  selectItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 6,
  },

  selectItemActive: {
    backgroundColor: '#e0e7ff',
  },

  /* ===== USUARIO ===== */
  userBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },

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
