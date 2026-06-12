import { useState, useEffect } from 'react';
import type { DaySchedule } from '@/data/visitData';
import { Clock, Ticket, Moon } from 'lucide-react';

interface OpeningHoursTableProps {
  schedules: DaySchedule[];
}

interface KeyInfoCardProps {
  icon: string;
  title: string;
  value: string;
  caption: string;
}

function KeyInfoCard({ icon, title, value, caption }: KeyInfoCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'clock':
        return <Clock size={32} strokeWidth={1.5} className="text-[#C9A96E]" />;
      case 'ticket':
        return <Ticket size={32} strokeWidth={1.5} className="text-[#C9A96E]" />;
      case 'moon':
        return <Moon size={32} strokeWidth={1.5} className="text-[#C9A96E]" />;
      default:
        return <Clock size={32} strokeWidth={1.5} className="text-[#C9A96E]" />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-radius-md shadow-sm">
      <div className="mb-3">{renderIcon()}</div>
      <h5 className="font-heading font-medium text-[18px] leading-[1.4] text-[#0A0A0A] mb-1">
        {title}
      </h5>
      <p className="text-base font-body font-medium text-[#0A0A0A] mb-1">{value}</p>
      <p className="text-[12px] font-body font-medium leading-[1.5] text-[#6B6560]">
        {caption}
      </p>
    </div>
  );
}

export default function OpeningHoursTable({ schedules }: OpeningHoursTableProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    const day = new Date().getDay();
    // JS getDay(): 0=Sunday, 1=Monday, ... 6=Saturday
    // Our array: 0=Monday, 1=Tuesday, ... 6=Sunday
    const index = day === 0 ? 6 : day - 1;
    setCurrentDayIndex(index);
  }, []);

  const isOpenToday = !schedules[currentDayIndex]?.isClosed;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10">
      {/* Left Column — Status + Hours Table */}
      <div>
        {/* Status Badge */}
        <div
          className={[
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            isOpenToday ? 'bg-[#2D6A4F]' : 'bg-[#C44B4B]',
          ].join(' ')}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={[
                'absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-dot',
                isOpenToday ? 'bg-[#F7F5F0]' : 'bg-[#F7F5F0]',
              ].join(' ')}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7F5F0]" />
          </span>
          <span className="text-[13px] font-body font-medium text-[#F7F5F0]">
            {isOpenToday
              ? "Le musée est ouvert aujourd'hui"
              : "Le musée est fermé aujourd'hui"}
          </span>
        </div>

        {/* Current Day Hours */}
        <p className="font-heading font-semibold text-[22px] md:text-[30px] leading-[1.25] text-[#0A0A0A] mb-6">
          {schedules[currentDayIndex]?.hours || '9h00 – 18h00'}
          {schedules[currentDayIndex]?.note && (
            <span className="text-[#C9A96E] ml-2">({schedules[currentDayIndex]?.note})</span>
          )}
        </p>

        {/* Weekly Hours Table */}
        <div className="border border-[#E8E4DC] rounded-radius-md overflow-hidden">
          <table className="w-full" role="table" aria-label="Horaires d'ouverture hebdomadaires">
            <thead className="sr-only">
              <tr>
                <th scope="col">Jour</th>
                <th scope="col">Horaires</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr
                  key={schedule.day}
                  className={[
                    'border-b border-[#E8E4DC] last:border-b-0',
                    index === currentDayIndex
                      ? 'bg-[rgba(201,169,110,0.08)] border-l-[3px] border-l-[#C9A96E]'
                      : '',
                  ].join(' ')}
                >
                  <td
                    className={[
                      'py-3 px-4 text-sm font-body text-[#0A0A0A] w-[120px]',
                      index === currentDayIndex ? 'font-medium' : '',
                    ].join(' ')}
                  >
                    {schedule.day}
                  </td>
                  <td className="py-3 px-4 text-sm font-body">
                    {schedule.isClosed ? (
                      <span className="font-medium text-[#C44B4B]">Fermé</span>
                    ) : (
                      <span className="text-[#0A0A0A]">
                        {schedule.hours}
                        {schedule.note && (
                          <span className="text-[#6B6560] ml-1">({schedule.note})</span>
                        )}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exceptional Closures */}
        <p className="mt-4 text-[12px] font-body text-[#6B6560]">
          Fermetures exceptionnelles : 1er mai, 25 décembre
        </p>
        <a
          href="#"
          className="inline-block mt-2 text-[12px] font-body font-medium text-[#C9A96E] hover:text-[#D4B87A] hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
        >
          Consulter le calendrier complet →
        </a>
      </div>

      {/* Right Column — Key Info Cards */}
      <div className="flex flex-col gap-4">
        <KeyInfoCard
          icon="clock"
          title="Dernière entrée"
          value="1h avant la fermeture"
          caption="Les salles commencent à se vider 30 min avant la fermeture"
        />
        <KeyInfoCard
          icon="ticket"
          title="Entrée gratuite"
          value="Tous les premiers samedis du mois, de 18h à 21h45"
          caption="Sur présentation d'un justificatif pour les moins de 26 ans résidents de l'UE"
        />
        <KeyInfoCard
          icon="moon"
          title="Nocturnes"
          value="Vendredi jusqu'à 21h45"
          caption="Une ambiance unique pour découvrir les collections"
        />
      </div>
    </div>
  );
}
