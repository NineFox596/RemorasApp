import { StyleSheet } from 'react-native';

export const usuariosStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },

  addButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  userName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  equipoText: {
    color: '#475569',
  },
});
