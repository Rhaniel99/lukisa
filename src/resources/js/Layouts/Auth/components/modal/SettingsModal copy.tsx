import { useState } from 'react';
import { User, Settings, Lock, X, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'perfil' | 'conta' | 'privacidade';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('perfil');

  // Form states (mocked)
  const [profileName, setProfileName] = useState('Rhaniel Monteiro');
  const [username, setUsername] = useState('Polar');
  const [privacyVisibility, setPrivacyVisibility] = useState('friends');
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2817]/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#E8DCC4] rounded-[2rem] shadow-2xl w-full max-w-6xl h-[700px] overflow-hidden flex flex-col md:flex-row relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#6B4E3D] hover:text-[#3D2817] z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#D4C5A9]/50 p-8 border-r border-[#C9B59A]/30 flex flex-col gap-2">
              <h2 className="text-[#3D2817] font-bold text-xl mb-6">Configurações</h2>
              
              <button
                onClick={() => setActiveTab('perfil')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'perfil'
                    ? 'bg-[#3D2817] text-[#F5EFE6]'
                    : 'text-[#6B4E3D] hover:bg-[#C9B59A]/50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </button>

              <button
                onClick={() => setActiveTab('conta')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'conta'
                    ? 'bg-[#3D2817] text-[#F5EFE6]'
                    : 'text-[#6B4E3D] hover:bg-[#C9B59A]/50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Conta</span>
              </button>

              <button
                onClick={() => setActiveTab('privacidade')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'privacidade'
                    ? 'bg-[#3D2817] text-[#F5EFE6]'
                    : 'text-[#6B4E3D] hover:bg-[#C9B59A]/50'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>Privacidade</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#F5EFE6] p-8 md:p-12 overflow-y-auto">
              
              {/* PERFIL TAB */}
              {activeTab === 'perfil' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-2xl"
                >
                  <h2 className="text-2xl font-bold text-[#3D2817] mb-8">Meu Perfil</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-24 h-24">
                       <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#E8DCC4]">
                        {/* <ImageWithFallback
                          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80"
                          alt="Avatar atual"
                          className="w-full h-full object-cover"
                        /> */}
                       </div>
                    </div>
                    <button className="px-4 py-2 bg-transparent border-2 border-[#6B4E3D] text-[#6B4E3D] rounded-lg hover:bg-[#6B4E3D] hover:text-[#F5EFE6] transition-colors font-medium">
                      Alterar Foto
                    </button>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-bold text-[#6B4E3D] tracking-wider uppercase mb-3">Anteriores</p>
                    <div className="flex gap-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E8DCC4]">
                           {/* <ImageWithFallback
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1573865526739-10659fec78a5' : '1495360019602-e0e28b704098'}?auto=format&fit=crop&w=100&q=60`}
                            alt={`Avatar anterior ${i}`}
                            className="w-full h-full object-cover"
                          /> */}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#3D2817]">Nome Completo</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#E8DCC4]/30 border-2 border-[#D4C5A9] rounded-xl focus:border-[#6B4E3D] focus:outline-none text-[#3D2817]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#3D2817]">Nome de Usuário</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-[#E8DCC4]/30 border-2 border-[#D4C5A9] rounded-xl focus:border-[#6B4E3D] focus:outline-none text-[#3D2817]"
                      />
                    </div>

                    <button className="px-6 py-3 bg-[#C9B59A] text-[#F5EFE6] rounded-lg font-medium mt-4 hover:bg-[#6B4E3D] transition-colors cursor-pointer">
                      Salvar Alterações
                    </button>
                  </div>
                </motion.div>
              )}

              {/* CONTA TAB */}
              {activeTab === 'conta' && (
                 <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-2xl"
                >
                  <h2 className="text-2xl font-bold text-[#3D2817] mb-8">Configurações da Conta</h2>

                  <div className="space-y-6 mb-10">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#3D2817]">Email</label>
                      <input
                        type="email"
                        value="rhanielmonteiro.13@gmail.com"
                        disabled
                        className="w-full px-4 py-3 bg-[#E8DCC4]/50 border-2 border-[#D4C5A9] rounded-xl text-[#6B4E3D] cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#3D2817]">Nova Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#E8DCC4]/30 border-2 border-[#D4C5A9] rounded-xl focus:border-[#6B4E3D] focus:outline-none text-[#3D2817]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#3D2817]">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#E8DCC4]/30 border-2 border-[#D4C5A9] rounded-xl focus:border-[#6B4E3D] focus:outline-none text-[#3D2817]"
                      />
                    </div>

                    <button className="px-6 py-3 bg-[#C9B59A] text-[#F5EFE6] rounded-lg font-medium hover:bg-[#6B4E3D] transition-colors">
                      Atualizar Conta
                    </button>
                  </div>

                  <div className="border-t border-[#D4C5A9] pt-8">
                    <h3 className="text-lg font-bold text-[#3D2817] mb-4">Deletar Conta</h3>
                    <p className="text-[#6B4E3D] text-sm mb-6 leading-relaxed">
                      Esta ação é irreversível. Todas as suas informações, memórias, dados pessoais e configurações serão permanentemente apagadas e não poderão ser recuperadas.
                    </p>
                    <button className="px-6 py-3 bg-[#D4183D] text-white rounded-lg font-medium hover:bg-[#A3122E] transition-colors">
                      Deletar Minha Conta
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PRIVACIDADE TAB */}
              {activeTab === 'privacidade' && (
                 <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-2xl"
                >
                  <h2 className="text-2xl font-bold text-[#3D2817] mb-2">Privacidade</h2>
                  <p className="text-[#6B4E3D] mb-8">Gerencie quem pode ver seu conteúdo e interagir com você.</p>

                  <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DCC4] mb-8">
                    <h3 className="text-[#3D2817] font-bold mb-4">Quem pode ver minhas memórias?</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-1">
                          <input
                            type="radio"
                            name="visibility"
                            className="peer sr-only"
                            checked={privacyVisibility === 'public'}
                            onChange={() => setPrivacyVisibility('public')}
                          />
                          <div className="w-5 h-5 border-2 border-[#6B4E3D] rounded-full peer-checked:border-[#6B4E3D] peer-checked:bg-[#6B4E3D] transition-colors"></div>
                          <div className="absolute w-2 h-2 bg-white rounded-full left-1.5 top-1.5 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                          <span className="block text-[#3D2817] font-medium">Público</span>
                          <span className="text-sm text-[#8B7355]">Qualquer um pode ver</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-1">
                          <input
                            type="radio"
                            name="visibility"
                            className="peer sr-only"
                            checked={privacyVisibility === 'friends'}
                            onChange={() => setPrivacyVisibility('friends')}
                          />
                          <div className="w-5 h-5 border-2 border-[#6B4E3D] rounded-full peer-checked:border-[#6B4E3D] peer-checked:bg-[#6B4E3D] transition-colors"></div>
                          <div className="absolute w-2 h-2 bg-white rounded-full left-1.5 top-1.5 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                          <span className="block text-[#3D2817] font-medium">Amigos</span>
                          <span className="text-sm text-[#8B7355]">Apenas seus amigos</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                         <div className="relative flex items-center mt-1">
                          <input
                            type="radio"
                            name="visibility"
                            className="peer sr-only"
                            checked={privacyVisibility === 'private'}
                            onChange={() => setPrivacyVisibility('private')}
                          />
                          <div className="w-5 h-5 border-2 border-[#6B4E3D] rounded-full peer-checked:border-[#6B4E3D] peer-checked:bg-[#6B4E3D] transition-colors"></div>
                          <div className="absolute w-2 h-2 bg-white rounded-full left-1.5 top-1.5 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                          <span className="block text-[#3D2817] font-medium">Somente Eu</span>
                          <span className="text-sm text-[#8B7355]">Privado</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DCC4] flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-[#3D2817] font-bold">Pedidos de Amizade</h3>
                      <p className="text-sm text-[#8B7355]">Permitir que outros usuários enviem solicitações de amizade?</p>
                    </div>
                    <button
                      onClick={() => setAllowFriendRequests(!allowFriendRequests)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${allowFriendRequests ? 'bg-[#3D2817]' : 'bg-[#D4C5A9]'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${allowFriendRequests ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <button className="px-6 py-3 bg-[#C9B59A] text-[#F5EFE6] rounded-lg font-medium hover:bg-[#6B4E3D] transition-colors">
                    Salvar Preferências
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
