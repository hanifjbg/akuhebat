import { Button, Spinner, Badge, Input, Label, Avatar, AvatarImage, AvatarFallback, ProgressBar, Skeleton, Divider, Checkbox, Radio, RadioGroup, Switch, Slider, Tooltip, ThemeSwitch } from "../../ui/atoms";
import { SearchBar, FormField, CardHeader, NavItem, QuizOption, StarRating, Timer, AvatarGroup, Tabs, TabsList, TabsTrigger, TabsContent, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../ui/molecules";
import { WordCard } from "../../ui/molecules/WordCard";
import { ProfileCard, FriendCard, QuizReport, BentoGrid, BentoCard } from "../../ui/organisms";
import { Link } from "react-router-dom";
import { Beaker, Play, Info, Home, User, Settings, Star, X, BookOpen, Music } from "lucide-react";

export function UxLabIndex() {
  return (
    <div className="flex-1 w-full h-full p-8 max-w-7xl mx-auto space-y-12">
      <header className="border-b-4 border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <Beaker className="w-10 h-10 text-primary" />
          UX-Lab: Claymorphism Showcase
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 font-medium">Bermain dengan komponen UI sebelum dirilis ke Area Anak!</p>
      </header>

      {/* Atoms Section */}
      <section className="space-y-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-clay p-8 shadow-sm border-2 border-white dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-6 flex items-center gap-2">
          <span className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-clay-sm">1</span> 
          Atoms
        </h2>

        {/* Buttons Showcase */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Buttons</h3>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline" className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600">Outline</Button>
            <Button variant="ghost" className="dark:text-slate-300 dark:hover:bg-slate-700">Ghost</Button>
          </div>
          
          <h4 className="text-md font-medium text-slate-500 dark:text-slate-400 mt-4">States</h4>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" isLoading>Loading...</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="outline" isError>Error State</Button>
          </div>

          <h4 className="text-md font-medium text-slate-500 dark:text-slate-400 mt-4">Sizes</h4>
          <div className="flex flex-wrap gap-4 items-end">
            <Button size="sm" variant="accent">Small</Button>
            <Button size="default" variant="accent">Default</Button>
            <Button size="lg" variant="accent">Large</Button>
            <Button size="icon" variant="accent">❤️</Button>
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">New!</Badge>
            <Badge variant="secondary">Level 2</Badge>
            <Badge variant="accent" animatePulse>+50 EXP</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline" className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300">Locked</Badge>
          </div>
        </div>

        {/* Spinners Showcase */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Spinners</h3>
          <div className="flex flex-wrap gap-8 items-end p-4 bg-slate-50 dark:bg-slate-800/80 rounded-clay-sm border border-slate-100 dark:border-slate-700 shadow-inner">
            <Spinner size="sm" color="primary" />
            <Spinner size="md" color="secondary" />
            <Spinner size="lg" color="primary" />
          </div>
        </div>

        {/* Inputs Showcase */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Inputs & Label</h3>
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-slate-300">Nama Anak</Label>
              <Input id="name" placeholder="Ketik nama di sini..." className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="errorInput" className="text-destructive dark:text-red-400">Dengan Error</Label>
              <Input id="errorInput" placeholder="Umur harus angka..." isError className="dark:bg-red-400/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabledInput" className="dark:text-slate-300">Nonaktif</Label>
              <Input id="disabledInput" placeholder="Tidak bisa diisi" disabled className="dark:bg-slate-800 dark:border-slate-700" />
            </div>
          </div>
        </div>

        {/* Avatars Showcase */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Avatars</h3>
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Felix" alt="Felix" />
              <AvatarFallback>FX</AvatarFallback>
            </Avatar>
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Aneka" alt="Aneka" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Riko" alt="Riko" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* ProgressBar & Skeleton Showcase */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 border-b pb-2">Progress Bar & Skeleton</h3>
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="space-y-2">
              <Label>EXP: 35%</Label>
              <ProgressBar value={35} indicatorColor="bg-accent" />
            </div>
            <div className="space-y-2">
              <Label>Unduh Data: 80%</Label>
              <ProgressBar value={80} indicatorColor="bg-secondary" />
            </div>

            <Divider className="my-2" />
            <Label>Memuat Data (Skeleton)...</Label>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-14 w-14 rounded-full border-4 border-white" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
        {/* Toggles & Sliders Showcase */}
        <div className="space-y-4 pt-8 border-t">
          <h3 className="text-lg font-semibold text-slate-600 border-b pb-2">Controls (Toggles & Sliders)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-clay-sm shadow-sm border border-slate-100">
                <Label htmlFor="s1">Notifikasi Suara</Label>
                <Switch id="s1" defaultChecked />
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-clay-sm shadow-sm border border-slate-100">
                <Label htmlFor="s2" className="text-slate-400">Notifikasi Email (Disabled)</Label>
                <Switch id="s2" disabled />
              </div>

              <div className="pt-4 space-y-4 border-t dark:border-slate-700">
                 <Label>Mode Terang / Gelap (Theme Switch)</Label>
                 <div className="flex gap-4">
                    <ThemeSwitch />
                 </div>
              </div>

              <div className="space-y-3 pt-4">
                <Label>Volume Musik</Label>
                <Slider defaultValue={[75]} max={100} step={1} className="w-[60%]" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Hobi Anak (Checkbox)</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="c1" defaultChecked />
                  <Label htmlFor="c1" className="font-medium cursor-pointer">Mewarnai</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="c2" />
                  <Label htmlFor="c2" className="font-medium cursor-pointer">Menyanyi</Label>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Pilih Karakter (Radio)</Label>
                <RadioGroup defaultValue="r1">
                  <div className="flex items-center space-x-2">
                    <Radio value="r1" id="r1" />
                    <Label htmlFor="r1" className="font-medium cursor-pointer">Pahlawan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Radio value="r2" id="r2" />
                    <Label htmlFor="r2" className="font-medium cursor-pointer">Penyihir</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-2">
                <Tooltip content="Mendapatkan bintang ekstra saat misi selesai!">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Info Bintang <Info className="w-4 h-4 text-accent" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Molecules Section */}
      <section className="space-y-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-clay p-8 shadow-sm border-2 border-white dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-6 flex items-center gap-2">
          <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-clay-sm">2</span> 
          Molecules
        </h2>

        {/* Inputs & Forms */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Forms & Inputs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <SearchBar placeholder="Cari mainan kesukaanmu..." />
              <div className="p-4 bg-white dark:bg-slate-800 rounded-clay-sm shadow-clay-sm border border-slate-100 dark:border-slate-700">
                <FormField id="username" label="Nama Pengguna" placeholder="Cth: Budi" />
                <FormField id="password" label="Kata Sandi Rahasia" type="password" error="Sandi terlalu pendek!" className="mt-4" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-clay shadow-clay-sm overflow-hidden border border-slate-100 dark:border-slate-700">
                <CardHeader 
                  title="Kartu Prestasi" 
                  description="Daftar lencanamu" 
                  icon={<Star />} 
                  action={<Button size="sm" variant="outline">Lihat</Button>}
                />
                <div className="p-4 h-20 bg-slate-50 dark:bg-slate-900/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Quiz */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Interactive Cards & Navs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-full flex justify-between shadow-inner max-w-sm">
                <NavItem icon={Home} label="Beranda" isActive variant="vertical" />
                <NavItem icon={Play} label="Main" variant="vertical" />
                <NavItem icon={User} label="Profil" variant="vertical" />
                <NavItem icon={Settings} label="Atur" variant="vertical" />
              </div>
              
              <div className="flex flex-col gap-2">
                <NavItem icon={Star} label="Misi Harian" variant="horizontal" />
                <NavItem icon={User} label="Teman" variant="horizontal" isActive />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <QuizOption text="Gajah" status="idle" />
                <QuizOption text="Harimau" status="selected" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <QuizOption text="Benar" status="correct" />
                <QuizOption text="Salah" status="incorrect" />
              </div>
            </div>
          </div>
        </div>

        {/* Display & Games Elements */}
        <div className="space-y-4 pt-8 border-t dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Display & Game Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <WordCard 
                word="APEL" 
                phonetics="a - pel" 
                imageUrl="https://api.dicebear.com/7.x/icons/svg?seed=apple" 
                onPlayAudio={() => console.log('play')} 
              />
            </div>
            
            <div className="space-y-6 max-w-sm">
              <div className="space-y-2">
                <Label>Penilaian Bintang</Label>
                <StarRating value={3} onChange={() => {}} size="lg" />
              </div>

              <div className="space-y-2">
                <Label>Sisa Waktu</Label>
                <div className="flex gap-4">
                  <Timer seconds={120} />
                  <Timer seconds={8} dangerThreshold={10} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pemain Lain</Label>
                <AvatarGroup 
                  avatars={[
                    { fallback: "B", src: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi" },
                    { fallback: "A", src: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=ani" },
                    { fallback: "C", src: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=cika" },
                    { fallback: "D" },
                    { fallback: "E" }
                  ]}
                  max={3}
                />
              </div>

              <div className="space-y-2 pt-4">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Lencana</TabsTrigger>
                    <TabsTrigger value="tab2">Piala</TabsTrigger>
                    <TabsTrigger value="tab3">Misi</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-clay-sm">
                    Isi tab lencana...
                  </TabsContent>
                  <TabsContent value="tab2" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-clay-sm">
                    Isi tab piala...
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* Overlays & Pickers */}
        <div className="space-y-4 pt-8 border-t dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Overlays & Pickers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <Label>Pilih Usia</Label>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Berapa umurmu?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Tahun</SelectItem>
                    <SelectItem value="5">5 Tahun</SelectItem>
                    <SelectItem value="6">6 Tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Menu Rahasia</Label>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Tekan Aku</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Pilihan Anak</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Ganti Nama</DropdownMenuItem>
                      <DropdownMenuItem>Ganti Karakter</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Keluar (Logout)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Pertanyaan (Accordion)</Label>
                <Accordion type="single" collapsible className="w-full max-w-sm">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Cara dapat bintang?</AccordionTrigger>
                    <AccordionContent>Kerjakan soal kuis dengan benar dan kumpulkan bintang untuk membuka mainan baru!</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Apa itu Misi Harian?</AccordionTrigger>
                    <AccordionContent>Tugas seru yang bisa kamu ikuti setiap hari.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            <div className="space-y-6 flex flex-col gap-4">
              <div className="space-y-2">
                <Label>Laci Samping (Sheet)</Label>
                <div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary">Buka Info Profil</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Profil Hebatku</SheetTitle>
                      </SheetHeader>
                      <div className="py-4 space-y-4">
                        <Avatar className="w-24 h-24 mx-auto">
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <p className="text-center font-bold">Anak Kelas B</p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Peringatan (Alert)</Label>
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Hapus Akun?</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Semua Data?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Aksi ini tidak bisa dikembalikan. Semua bintang akan hilang.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-red-600 text-white">Ya, Hapus</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Toast Notification (Static Preview)</Label>
                <div className="relative">
                  <div className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-clay-sm h-32 relative overflow-hidden flex items-center justify-center pointer-events-none">
                    <div className="absolute right-2 top-2 p-2 w-[80%] rounded-xl shadow-clay-md bg-white dark:bg-slate-800 border-2 border-white dark:border-slate-700">
                      <h4 className="font-bold text-sm">Hebat! Level Naik!</h4>
                      <p className="text-xs text-slate-500">Kamu mendapat 50 exp.</p>
                      <X className="w-3 h-3 absolute right-2 top-2 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Organisms Section */}
      <section className="space-y-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-clay p-8 shadow-sm border-2 border-white dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-6 flex items-center gap-2">
          <span className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-clay-sm">3</span> 
          Organisms
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Profile & Friends</h3>
            <ProfileCard 
              userName="Budi" 
              level={5} 
              exp={150} 
              nextLevelExp={500} 
              totalStars={1240} 
              avatarSrc="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=budi" 
            />
            <div className="mt-4">
              <FriendCard 
                friendId="f1" 
                name="Siti" 
                level={4} 
                relation="friend" 
                status="online" 
                avatarSrc="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=siti" 
                onChallenge={() => {}}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-2">Quiz Components</h3>
            <QuizReport 
              score={4} 
              totalQuestions={5} 
              stars={2} 
              expGained={100} 
              onRetry={() => {}} 
              onNext={() => {}} 
            />
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="pt-8 border-t dark:border-slate-700">
           <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-4 mb-4">Bento Grid Variations (Home Dashboard)</h3>
           <BentoGrid className="max-w-4xl mx-auto">
              <BentoCard 
                colSpan={2} 
                rowSpan={1} 
                colorVariant="primary" 
                className="items-start justify-center p-8 group"
                overlapElement={
                  <div className="absolute -top-6 -right-2 drop-shadow-xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-2xl shadow-clay-md border-4 border-white flex items-center justify-center transform rotate-12">
                      <Star className="w-10 h-10 sm:w-12 sm:h-12 fill-white text-white drop-shadow-md" />
                    </div>
                  </div>
                }
              >
                 <div className="flex flex-col items-start z-10 relative h-full justify-center">
                   <h4 className="text-2xl sm:text-3xl font-black mb-2 text-white drop-shadow-md">Mainkan Misi!</h4>
                   <p className="opacity-90 font-bold">Kumpulkan bintang hari ini.</p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none">
                   <Play className="w-40 h-40 fill-white" />
                 </div>
              </BentoCard>

              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="secondary" 
                className="items-center justify-center p-6 group"
              >
                 <div className="z-10 relative px-4 text-center h-full flex flex-col justify-center items-center">
                   <h4 className="text-5xl font-black mb-2 drop-shadow-md">5</h4>
                   <p className="opacity-90 font-bold leading-tight">Misi Selesai</p>
                 </div>
                 <div className="absolute -bottom-8 -left-8 opacity-30 group-hover:rotate-12 transition-transform pointer-events-none">
                   <Star className="w-32 h-32 fill-white" />
                 </div>
              </BentoCard>

              <BentoCard 
                colSpan={1} 
                rowSpan={1} 
                colorVariant="accent" 
                className="group p-6"
                overlapElement={
                  <div className="absolute -top-4 -left-4 drop-shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-full shadow-clay-sm flex items-center justify-center border-4 border-accent">
                      <BookOpen className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                }
              >
                 <div className="z-10 relative h-full flex flex-col justify-end pt-8">
                   <h4 className="text-xl font-bold mb-1 drop-shadow-sm">Buku Cerita</h4>
                   <p className="opacity-90 text-sm font-medium">Baca kisah seru hari ini.</p>
                 </div>
              </BentoCard>

              <BentoCard 
                colSpan={2} 
                rowSpan={1} 
                colorVariant="default" 
                className="group p-6 sm:p-8"
              >
                 <div className="z-10 relative h-full flex items-center justify-between w-full">
                   <div>
                     <h4 className="text-2xl font-black mb-1 text-slate-800 dark:text-white">Musik Edukasi</h4>
                     <p className="text-slate-500 dark:text-slate-300 text-sm font-bold">Dengarkan lagu seru.</p>
                   </div>
                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-600 rounded-full flex items-center justify-center shadow-clay-sm border-4 border-indigo-100 dark:border-slate-500 group-hover:scale-110 transition-transform flex-shrink-0">
                      <Music className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
                   </div>
                 </div>
              </BentoCard>
           </BentoGrid>
        </div>

        <div className="pt-8">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 border-b dark:border-slate-700 pb-4 mb-4">TopBar & BottomBar (Static Previews)</h3>
          <div className="relative w-full h-[300px] border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-clay bg-slate-100 dark:bg-slate-900 overflow-hidden transform scale-90 md:scale-100 origin-top">
            <div className="absolute top-0 right-0 left-0 h-20 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-b-2 border-white flex items-center px-4 justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10"><AvatarFallback>B</AvatarFallback></Avatar>
                <span className="font-bold">Budi</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/> <span className="font-bold text-yellow-700">1,240</span></div>
            </div>
            
            <div className="absolute bottom-0 right-0 left-0 h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-t-2 border-white flex items-center justify-around pointer-events-none px-4">
              <div className="flex flex-col items-center text-primary"><Home className="w-6 h-6 mb-1"/><span className="text-[10px] font-bold">Beranda</span></div>
              <div className="flex flex-col items-center text-slate-400"><Play className="w-6 h-6 mb-1"/><span className="text-[10px] font-bold">Main</span></div>
              <div className="flex flex-col items-center text-slate-400"><User className="w-6 h-6 mb-1"/><span className="text-[10px] font-bold">Profil</span></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none font-bold text-xl">Preview Area</div>
          </div>
        </div>

      </section>

    </div>
  );
}
