import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /*******************/
  /** P R O F I L   **/
  /*******************/

  profileHeader: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 2,
    marginBottom: 10,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1c5be4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 14,
    color: '#666',
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },

  stat: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c5be4ff',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
  },

  cartPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },

  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },

  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },

  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  badgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ffeaea',
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
    marginLeft: 10,
  },

  version: {
    alignItems: 'center',
    marginBottom: 20,
  },

  versionText: {
    fontSize: 12,
    color: '#999',
  },

  /*************************/
  /** AUTRES STYLES (gardez ceux que vous utilisez) **/
  /*************************/

  drawerHeader: {
    padding: 16,
    backgroundColor: '#1c5be4ff',
    marginBottom: 8,
  },
  
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  
  drawerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  drawerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  
  drawerFooter: {
    padding: 16,
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },

  /*************************/
  /** F O R M U L A I R E **/
  /*************************/

  formContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 8,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 8,
  },

  titre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },

  sousTitre: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },

  champContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  input: {
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#212529',
  },

  bouton: {
    backgroundColor: '#1c5be4ff',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
  },

  texteBouton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  /***************************************/
  /** A R T I C L E   &   P R O D U I T **/
  /***************************************/

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#E7E2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  designation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },

  /*****************/
  /** H E A D E R **/
  /*****************/

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
});