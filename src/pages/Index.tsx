import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const movies = [
  {
    id: 1,
    title: 'Космический рубеж',
    genre: 'Фантастика',
    rating: 8.5,
    duration: '2ч 15мин',
    poster: 'https://cdn.poehali.dev/projects/a4c2059f-7efd-4f3d-aa0c-b42571e5f927/files/112c7198-cc6f-49ae-850e-e87c4fe778ad.jpg',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Эпическое путешествие через галактику в поисках новой планеты для человечества.',
    showtimes: ['10:00', '13:30', '16:45', '19:30', '22:15']
  },
  {
    id: 2,
    title: 'Тёмная тайна',
    genre: 'Триллер',
    rating: 7.8,
    duration: '1ч 58мин',
    poster: 'https://cdn.poehali.dev/projects/a4c2059f-7efd-4f3d-aa0c-b42571e5f927/files/37fc70bc-c0a2-4ee1-b251-48aefb66b09a.jpg',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Детектив расследует серию загадочных исчезновений в маленьком городке.',
    showtimes: ['11:15', '14:00', '17:20', '20:45']
  },
  {
    id: 3,
    title: 'Легенды забытого мира',
    genre: 'Фэнтези',
    rating: 9.1,
    duration: '2ч 42мин',
    poster: 'https://cdn.poehali.dev/projects/a4c2059f-7efd-4f3d-aa0c-b42571e5f927/files/c6599fcb-48ac-4cc8-be51-1b58fcdb7a7b.jpg',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Приключения молодого героя в волшебном мире, где магия реальна.',
    showtimes: ['09:30', '12:45', '16:00', '19:15', '22:30']
  }
];

type SeatStatus = 'available' | 'selected' | 'occupied' | 'vip';

interface Seat {
  id: string;
  row: number;
  number: number;
  status: SeatStatus;
  price: number;
}

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<typeof movies[0] | null>(null);
  const [showSeatsDialog, setShowSeatsDialog] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [seats, setSeats] = useState<Seat[]>(() => {
    const initialSeats: Seat[] = [];
    for (let row = 1; row <= 10; row++) {
      for (let seat = 1; seat <= 12; seat++) {
        const isVip = row >= 7;
        const isOccupied = Math.random() > 0.7;
        initialSeats.push({
          id: `${row}-${seat}`,
          row,
          number: seat,
          status: isOccupied ? 'occupied' : isVip ? 'vip' : 'available',
          price: isVip ? 800 : 500
        });
      }
    }
    return initialSeats;
  });

  const handleSeatClick = (seatId: string) => {
    setSeats(seats.map(seat => {
      if (seat.id === seatId && seat.status !== 'occupied') {
        return {
          ...seat,
          status: seat.status === 'selected' ? (seat.price === 800 ? 'vip' : 'available') : 'selected'
        };
      }
      return seat;
    }));
  };

  const selectedSeats = seats.filter(s => s.status === 'selected');
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBooking = (movie: typeof movies[0], showtime: string) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setShowSeatsDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Film" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CinemaX</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Кинотеатры</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Фильмы</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Новинки</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button variant="outline" className="hidden md:flex">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="container mx-auto relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
              Билеты в кино онлайн
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Выбирайте лучшие места и бронируйте билеты в один клик
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Ticket" size={20} className="mr-2" />
                Купить билет
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Calendar" size={20} className="mr-2" />
                Расписание
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="now" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="now">Сейчас в кино</TabsTrigger>
                <TabsTrigger value="soon">Скоро</TabsTrigger>
                <TabsTrigger value="top">Топ фильмов</TabsTrigger>
              </TabsList>

              <TabsContent value="now" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((movie) => (
                    <Card key={movie.id} className="overflow-hidden hover-scale cursor-pointer group bg-card border-border">
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img 
                          src={movie.poster} 
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <Button 
                              className="w-full"
                              onClick={() => setSelectedMovie(movie)}
                            >
                              <Icon name="Play" size={18} className="mr-2" />
                              Подробнее
                            </Button>
                          </div>
                        </div>
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                          <Icon name="Star" size={14} className="mr-1" />
                          {movie.rating}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-foreground">{movie.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Tag" size={14} />
                            {movie.genre}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {movie.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="soon" className="text-center py-12">
                <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Скоро появятся новые премьеры</p>
              </TabsContent>

              <TabsContent value="top" className="text-center py-12">
                <Icon name="TrendingUp" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Топ фильмов месяца</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Dialog open={selectedMovie !== null} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
          {selectedMovie && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedMovie.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <img 
                    src={selectedMovie.poster} 
                    alt={selectedMovie.title}
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      <Icon name="Star" size={16} className="mr-1" />
                      {selectedMovie.rating}
                    </Badge>
                    <span className="text-muted-foreground">{selectedMovie.genre}</span>
                    <span className="text-muted-foreground">{selectedMovie.duration}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMovie.description}
                  </p>

                  <div className="pt-4">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Clock" size={20} />
                      Выберите сеанс
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedMovie.showtimes.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          onClick={() => handleBooking(selectedMovie, time)}
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Video" size={20} />
                      Трейлер
                    </h4>
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={selectedMovie.trailer}
                        title="Трейлер"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showSeatsDialog} onOpenChange={setShowSeatsDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Выбор мест</DialogTitle>
            {selectedMovie && (
              <p className="text-muted-foreground">
                {selectedMovie.title} • {selectedShowtime}
              </p>
            )}
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted border-2 border-border" />
                <span>Доступно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary" />
                <span>Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-secondary" />
                <span>VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted-foreground/30" />
                <span>Занято</span>
              </div>
            </div>

            <div className="bg-gradient-to-b from-muted to-transparent h-2 rounded-full mb-4" />
            <p className="text-center text-sm text-muted-foreground mb-6">ЭКРАН</p>

            <div className="max-w-3xl mx-auto">
              {Array.from({ length: 10 }, (_, rowIndex) => (
                <div key={rowIndex} className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-8 text-sm text-muted-foreground text-right">{rowIndex + 1}</span>
                  <div className="flex gap-2">
                    {seats
                      .filter(s => s.row === rowIndex + 1)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === 'occupied'}
                          className={`
                            w-8 h-8 rounded text-xs font-medium transition-all duration-200
                            ${seat.status === 'available' ? 'bg-muted border-2 border-border hover:border-primary hover:scale-110' : ''}
                            ${seat.status === 'selected' ? 'bg-primary text-primary-foreground scale-110 shadow-lg' : ''}
                            ${seat.status === 'vip' ? 'bg-secondary text-secondary-foreground hover:border-secondary hover:scale-110 border-2 border-border' : ''}
                            ${seat.status === 'occupied' ? 'bg-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          {seat.status !== 'occupied' && seat.number}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedSeats.length > 0 && (
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Выбрано мест: {selectedSeats.length}</p>
                    <p className="text-sm text-muted-foreground">
                      Места: {selectedSeats.map(s => `${s.row}-${s.number}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{totalPrice} ₽</p>
                  </div>
                </div>
                <Button className="w-full text-lg py-6" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оплатить {totalPrice} ₽
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-card border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Film" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">CinemaX</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучший сервис для покупки билетов в кино онлайн
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Пресс-центр</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат билетов</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 CinemaX. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;