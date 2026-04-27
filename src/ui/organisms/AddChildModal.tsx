import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, Input, Label, Avatar, AvatarImage, AvatarFallback } from "../atoms"
import { Dices, X } from "lucide-react"

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatarUrl: string) => void;
  isSaving?: boolean;
}

const getRandomSeeds = () => {
  return Array.from({ length: 6 }, () => Math.random().toString(36).substring(7));
};

export function AddChildModal({ isOpen, onClose, onSave, isSaving }: AddChildModalProps) {
  const [name, setName] = React.useState("");
  const [seeds, setSeeds] = React.useState<string[]>(getRandomSeeds());
  const [selectedSeed, setSelectedSeed] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setSeeds(getRandomSeeds());
      setSelectedSeed(null);
    }
  }, [isOpen]);

  const handleRandomize = () => {
    setSeeds(getRandomSeeds());
    setSelectedSeed(null);
  };

  const handleSave = () => {
    if (!name.trim() || !selectedSeed) return;
    onSave(name.trim(), `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${selectedSeed}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-clay-lg border-4 border-slate-100 dark:border-slate-700 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Tambah Anak</h2>
              <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-lg font-bold">Nama Panggilan</Label>
                <Input 
                  id="childName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Siapa namamu?"
                  className="h-14 text-xl font-bold bg-slate-50 border-2"
                  autoFocus
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">Pilih Avatar</Label>
                  <Button variant="outline" size="sm" onClick={handleRandomize} className="rounded-full shadow-clay-sm">
                    <Dices className="w-4 h-4 mr-2" />
                    Acak Lagi
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {seeds.map((seed) => {
                    const isSelected = selectedSeed === seed;
                    return (
                      <motion.div 
                        key={seed}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSeed(seed)}
                        className={`cursor-pointer rounded-2xl border-4 transition-all ${isSelected ? 'border-primary shadow-clay-md bg-primary/10' : 'border-transparent bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
                      >
                        <Avatar className="w-full h-auto aspect-square rounded-xl p-2 bg-transparent">
                          <AvatarImage src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${seed}`} />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 rounded-2xl text-xl mt-4" 
                disabled={!name.trim() || !selectedSeed || isSaving}
                isLoading={isSaving}
                onClick={handleSave}
              >
                Simpan Profil
              </Button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
