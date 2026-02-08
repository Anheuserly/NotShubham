"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const dockApps = [
  { id: "finder", name: "Finder", icon: "/icons/finder.svg" },
  { id: "apps", name: "Apps", icon: "/icons/apps.svg" },
  { id: "projects", name: "Projects", icon: "/icons/projects.svg" },
  { id: "citytalk", name: "CityTalk", icon: "/icons/citytalk.svg" },
  { id: "windows11", name: "Windows 11", icon: "/icons/windows11.svg" },
  { id: "linux", name: "Linux", icon: "/icons/linux.svg" },
  { id: "ubuntu", name: "Ubuntu", icon: "/icons/ubuntu.svg" },
  { id: "kali", name: "Kali", icon: "/icons/kali.svg" },
  { id: "studio", name: "Studio", icon: "/icons/studio.svg" },
  { id: "terminal", name: "Terminal", icon: "/icons/terminal.svg" },
  { id: "notes", name: "Notes", icon: "/icons/notes.svg" },
  { id: "music", name: "Music", icon: "/icons/music.svg" },
  { id: "settings", name: "Settings", icon: "/icons/settings.svg" },
  { id: "safari", name: "Safari", icon: "/icons/safari.svg" },
  { id: "vscode", name: "VS Code", icon: "/icons/vscode.svg" },
  { id: "discord", name: "Discord", icon: "/icons/discord.svg" },
  { id: "bin", name: "Bin", icon: "/icons/bin.svg" },
  { id: "games", name: "Games", icon: "/icons/games.svg" },
];

const desktopApps = [
  { id: "whatsapp", name: "WhatsApp", icon: "/icons/whatsapp.svg" },
  { id: "instagram", name: "Instagram", icon: "/icons/instagram.svg" },
  { id: "discord", name: "Discord", icon: "/icons/discord.svg" },
  { id: "camera", name: "Camera", icon: "/icons/camera.svg" },
  { id: "calculator", name: "Calculator", icon: "/icons/calculator.svg" },
  { id: "calendar", name: "Calendar", icon: "/icons/calendar.svg" },
  { id: "amc", name: "AMC MEP 24x7", icon: "/icons/amc.svg" },
  { id: "github", name: "GitHub Desktop", icon: "/icons/github.svg" },
  { id: "safari", name: "Safari", icon: "/icons/safari.svg" },
  { id: "vscode", name: "VS Code", icon: "/icons/vscode.svg" },
];

const widgets = [
  {
    id: "weather",
    title: "New Delhi",
    body: "16°C · Partly Cloudy",
    meta: ["9 PM 15°", "10 PM 14°", "11 PM 14°"],
  },
  {
    id: "calendar",
    title: "Calendar",
    body: "Sun 8 Feb",
    meta: ["CityTalk demo · Tue 11:00 AM"],
  },
  {
    id: "reminders",
    title: "Reminders",
    body: "No reminders today.",
    meta: ["0 due"],
  },
];

const safariFavorites = [
  {
    name: "Arc Eleven Architect",
    url: "arcelevenarchitect.com",
    icon: "/icons/favorites/arc.svg",
  },
  { name: "Palanhar", url: "palanhar.com", icon: "/icons/favorites/palanhar.svg" },
  { name: "SS Engineers", url: "ssengineers.in", icon: "/icons/favorites/ss.svg" },
  { name: "SGE", url: "sge.org.in", icon: "/icons/favorites/sge.svg" },
  { name: "AMC MEP", url: "amcmep.in", icon: "/icons/favorites/amc.svg" },
  { name: "Facebook", url: "facebook.com", icon: "/icons/favorites/facebook.svg" },
  { name: "Instagram", url: "instagram.com", icon: "/icons/favorites/instagram.svg" },
  { name: "LinkedIn", url: "linkedin.com", icon: "/icons/favorites/linkedin.svg" },
];

const appContent: Record<string, { title: string; body: string; subtitle?: string }> = {
  apps: {
    title: "Apps",
    subtitle: "Launchpad",
    body: "Open any application from your desktop collection.",
  },
  finder: {
    title: "Finder",
    subtitle: "Notshubham · Desktop",
    body: "Quick access to projects, apps, and live city spaces.",
  },
  projects: {
    title: "Projects",
    subtitle: "Launchpad",
    body: "OS-inspired builds, realtime platforms, and immersive product labs.",
  },
  citytalk: {
    title: "CityTalk Live",
    subtitle: "Realtime City World",
    body: "Neighborhoods, live events, and creator tools running 24/7.",
  },
  studio: {
    title: "Studio",
    subtitle: "Notshubham Studio",
    body: "Design, engineering, and launch acceleration for product teams.",
  },
  windows11: {
    title: "Windows 11",
    subtitle: "OS Workspace",
    body: "A sleek, productive environment with modern UI and snap layouts.",
  },
  linux: {
    title: "Linux",
    subtitle: "Open Source OS",
    body: "Powerful, flexible, and built for developers and infrastructure.",
  },
  ubuntu: {
    title: "Ubuntu",
    subtitle: "Linux Distribution",
    body: "A friendly desktop OS with a strong community and fast setup.",
  },
  kali: {
    title: "Kali Linux",
    subtitle: "Security Toolkit",
    body: "Advanced security and penetration testing tools in one OS.",
  },
  terminal: {
    title: "Terminal",
    subtitle: "zsh · local",
    body: "$ build --realtime --polished --delight\n$ ship",
  },
  notes: {
    title: "Notes",
    subtitle: "Ideas",
    body: "Capture concepts, product sketches, and launch checklists.",
  },
  music: {
    title: "Music",
    subtitle: "Focus Playlist",
    body: "Now playing: Ambient Cityscapes · 42 min left.",
  },
  settings: {
    title: "Settings",
    subtitle: "System",
    body: "Personalize wallpaper, widgets, and dock behavior.",
  },
  safari: {
    title: "Safari",
    subtitle: "notshubham.dev",
    body: "A fast, focused browser for exploring the city web.",
  },
  vscode: {
    title: "VS Code",
    subtitle: "Workspace",
    body: "Shipping realtime features with clean, modern code.",
  },
  discord: {
    title: "Discord",
    subtitle: "Community",
    body: "Live collabs, launch rooms, and community updates.",
  },
  bin: {
    title: "Bin",
    subtitle: "Trash",
    body: "Nothing to delete right now.",
  },
  games: {
    title: "Games",
    subtitle: "Arcade",
    body: "Play and prototype interactive experiences.",
  },
  whatsapp: {
    title: "WhatsApp",
    subtitle: "Chats",
    body: "New message from CityTalk Team.",
  },
  instagram: {
    title: "Instagram",
    subtitle: "Studio Feed",
    body: "Latest launch visuals and behind-the-scenes shots.",
  },
  camera: {
    title: "Camera",
    subtitle: "Studio",
    body: "Capture a new shot for the next release.",
  },
  calculator: {
    title: "Calculator",
    subtitle: "Quick Math",
    body: "Build cost estimates and sprint planning numbers.",
  },
  calendar: {
    title: "Calendar",
    subtitle: "Schedule",
    body: "Upcoming: CityTalk demo · Tue · 11:00 AM.",
  },
  amc: {
    title: "AMC MEP 24x7",
    subtitle: "Operations",
    body: "Monitoring energy, systems, and facility performance.",
  },
  github: {
    title: "GitHub Desktop",
    subtitle: "Repositories",
    body: "Sync branches and ship releases with confidence.",
  },
};

const defaultWindowPositions = [
  { x: 120, y: 140 },
  { x: 260, y: 180 },
  { x: 360, y: 120 },
  { x: 480, y: 220 },
  { x: 200, y: 320 },
];

const windowSizes: Record<string, { width: number; height: number }> = {
  apps: { width: 860, height: 520 },
  finder: { width: 520, height: 360 },
  projects: { width: 520, height: 360 },
  citytalk: { width: 520, height: 360 },
  windows11: { width: 560, height: 360 },
  linux: { width: 560, height: 360 },
  ubuntu: { width: 560, height: 360 },
  kali: { width: 560, height: 360 },
  studio: { width: 520, height: 360 },
  terminal: { width: 520, height: 320 },
  notes: { width: 520, height: 320 },
  music: { width: 520, height: 320 },
  settings: { width: 520, height: 340 },
  calendar: { width: 520, height: 360 },
};

export default function Home() {
  const [openApps, setOpenApps] = useState<string[]>(["finder"]);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
  const [maximizedApps, setMaximizedApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<string>("finder");
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(
    () => ({
      finder: { x: 120, y: 140 },
    })
  );
  const [openingId, setOpeningId] = useState<string>("finder");
  const [minimizingId, setMinimizingId] = useState<string>("");
  const [dragging, setDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [safariQuery, setSafariQuery] = useState<string>("");
  const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);
  const [controlCenterOpen, setControlCenterOpen] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [widgetEditOpen, setWidgetEditOpen] = useState<boolean>(false);
  const [widgetVisibility, setWidgetVisibility] = useState<Record<string, boolean>>(
    () =>
      widgets.reduce((acc, widget) => {
        acc[widget.id] = true;
        return acc;
      }, {} as Record<string, boolean>)
  );
  const [windowSizeState, setWindowSizeState] = useState<
    Record<string, { width: number; height: number }>
  >(() => ({ ...windowSizes }));
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [desktopSize, setDesktopSize] = useState<{ width: number; height: number }>(
    () => ({ width: 0, height: 0 })
  );

  const launchpadApps = useMemo(() => {
    const seen = new Set<string>();
    return [...dockApps, ...desktopApps].filter((app) => {
      if (seen.has(app.id)) return false;
      seen.add(app.id);
      return true;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => setMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "Space") {
        event.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setSpotlightOpen(false);
        setControlCenterOpen(false);
        setNotificationOpen(false);
        setWidgetEditOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!desktopRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        setDesktopSize({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(desktopRef.current);
    return () => observer.disconnect();
  }, []);

  const timeLabel = useMemo(() => {
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [now]);

  const dateLabel = useMemo(() => {
    return now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [now]);

  const getWindowSize = (id: string) =>
    windowSizeState[id] ?? windowSizes[id] ?? { width: 520, height: 340 };

  const clampPosition = (id: string, x: number, y: number) => {
    const size = getWindowSize(id);
    if (!desktopSize.width || !desktopSize.height) return { x, y };
    const width = Math.min(size.width, desktopSize.width - 32);
    const height = Math.min(size.height, desktopSize.height - 32);
    const maxX = desktopSize.width - width - 16;
    const maxY = desktopSize.height - height - 16;
    return {
      x: Math.min(Math.max(x, 16), Math.max(maxX, 16)),
      y: Math.min(Math.max(y, 24), Math.max(maxY, 24)),
    };
  };

  const openApp = (id: string) => {
    setOpenApps((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMinimizedApps((prev) => prev.filter((app) => app !== id));
    setActiveApp(id);
    setOpeningId(id);
    setTimeout(() => setOpeningId(""), 280);
    setPositions((prev) => {
      if (prev[id]) return prev;
      const fallback = defaultWindowPositions[Object.keys(prev).length % defaultWindowPositions.length];
      const size = getWindowSize(id);
      const baseX = desktopSize.width
        ? (desktopSize.width - size.width) / 2 + 40
        : fallback.x;
      const baseY = desktopSize.height
        ? (desktopSize.height - size.height) / 2 - 20
        : fallback.y;
      const clamped = clampPosition(id, baseX, baseY);
      return { ...prev, [id]: clamped };
    });
  };

  const closeApp = (id: string) => {
    setOpenApps((prev) => prev.filter((app) => app !== id));
    setMinimizedApps((prev) => prev.filter((app) => app !== id));
    setMaximizedApps((prev) => prev.filter((app) => app !== id));
    setActiveApp((prev) => (prev === id ? "" : prev));
  };

  const minimizeApp = (id: string) => {
    setMinimizingId(id);
    setTimeout(() => setMinimizingId(""), 220);
    setMinimizedApps((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveApp((prev) => (prev === id ? "" : prev));
  };

  const toggleMaximize = (id: string) => {
    setMaximizedApps((prev) =>
      prev.includes(id) ? prev.filter((app) => app !== id) : [...prev, id]
    );
    setActiveApp(id);
  };

  const bringToFront = (id: string) => {
    setOpenApps((prev) => {
      const filtered = prev.filter((app) => app !== id);
      return [...filtered, id];
    });
    setActiveApp(id);
    setMinimizedApps((prev) => prev.filter((app) => app !== id));
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY });
  };

  const handleSafariSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = safariQuery.trim();
    if (!raw) return;
    const hasProtocol = /^https?:\/\//i.test(raw);
    const isLikelyDomain = raw.includes(".") && !raw.includes(" ");
    const target = hasProtocol
      ? raw
      : isLikelyDomain
        ? `https://${raw}`
        : `https://www.google.com/search?q=${encodeURIComponent(raw)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (event: MouseEvent) => {
      const size = getWindowSize(dragging.id);
      if (!desktopRef.current) return;
      const desktopBounds = desktopRef.current.getBoundingClientRect();
      const width = Math.min(size.width, desktopBounds.width - 32);
      const height = Math.min(size.height, desktopBounds.height - 32);
      const nextX = event.clientX - desktopBounds.left - dragging.offsetX;
      const nextY = event.clientY - desktopBounds.top - dragging.offsetY;
      const maxX = desktopBounds.width - width - 16;
      const maxY = desktopBounds.height - height - 16;
      const clampedX = Math.min(Math.max(nextX, 16), Math.max(maxX, 16));
      const clampedY = Math.min(Math.max(nextY, 24), Math.max(maxY, 24));
      setPositions((prev) => ({
        ...prev,
        [dragging.id]: { x: clampedX, y: clampedY },
      }));
    };
    const handleUp = () => {
      if (!desktopRef.current || !dragging) {
        setDragging(null);
        return;
      }
      const bounds = desktopRef.current.getBoundingClientRect();
      const size = getWindowSize(dragging.id);
      const pos = positions[dragging.id];
      if (pos) {
        const snapMargin = 24;
        if (pos.y <= snapMargin) {
          toggleMaximize(dragging.id);
        } else if (pos.x <= snapMargin) {
          const halfWidth = bounds.width / 2 - 24;
          setWindowSizeState((prev) => ({
            ...prev,
            [dragging.id]: { width: halfWidth, height: size.height },
          }));
          setPositions((prev) => ({ ...prev, [dragging.id]: { x: 16, y: 24 } }));
        } else if (pos.x + size.width >= bounds.width - snapMargin) {
          const halfWidth = bounds.width / 2 - 24;
          setWindowSizeState((prev) => ({
            ...prev,
            [dragging.id]: { width: halfWidth, height: size.height },
          }));
          setPositions((prev) => ({
            ...prev,
            [dragging.id]: { x: bounds.width / 2 + 8, y: 24 },
          }));
        }
      }
      setDragging(null);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!desktopSize.width || !desktopSize.height) return;
    setPositions((prev) => {
      const next: Record<string, { x: number; y: number }> = { ...prev };
      Object.entries(prev).forEach(([id, pos]) => {
        next[id] = clampPosition(id, pos.x, pos.y);
      });
      return next;
    });
  }, [desktopSize.width, desktopSize.height]);

  return (
    <main className="os" onContextMenu={handleContextMenu}>
      <header className="os__menubar">
        <div className="menubar__left">
          <span className="menubar__logo"></span>
          <nav className="menubar__nav">
            <button type="button" onClick={() => openApp("finder")}>Finder</button>
            <button type="button">File</button>
            <button type="button">Edit</button>
            <button type="button">View</button>
            <button type="button">Go</button>
            <button type="button">Window</button>
            <button type="button">Help</button>
          </nav>
        </div>
        <div className="menubar__right">
          <div className="menubar__icons">
            <button type="button" onClick={() => setControlCenterOpen((prev) => !prev)}>
              <img src="/icons/menubar-wifi.svg" alt="Wi-Fi" />
            </button>
            <button type="button">
              <img src="/icons/menubar-battery.svg" alt="Battery" />
            </button>
            <button type="button" onClick={() => setSpotlightOpen((prev) => !prev)}>
              <img src="/icons/menubar-search.svg" alt="Search" />
            </button>
            <button type="button">
              <img src="/icons/menubar-siri.svg" alt="Siri" />
            </button>
            <button type="button" onClick={() => setControlCenterOpen((prev) => !prev)}>
              <img src="/icons/menubar-control.svg" alt="Control Center" />
            </button>
          </div>
          <button type="button" className="menubar__clock" onClick={() => setNotificationOpen((prev) => !prev)}>
            {dateLabel} {timeLabel}
          </button>
        </div>
      </header>

      <section className="os__desktop" ref={desktopRef}>
        <div className="desktop__widgets">
          {widgets
            .filter((widget) => widgetVisibility[widget.id])
            .map((widget) => (
              <div key={widget.id} className={`widget widget--compact widget--${widget.id}`}>
                <div className="widget__header">
                  <h3>{widget.title}</h3>
                  <span>{widget.body}</span>
                </div>
                <div className="widget__meta">
                  {widget.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className="desktop__windows">
          {openApps.map((id, index) => {
            const content = appContent[id] ?? {
              title: id,
              body: "",
            };
            const isMinimized = minimizedApps.includes(id);
            const isMaximized = maximizedApps.includes(id);
            const position = positions[id] ?? defaultWindowPositions[index % defaultWindowPositions.length];
            const baseSize = getWindowSize(id);
            const size = desktopSize.width
              ? {
                  width: Math.min(baseSize.width, desktopSize.width - 32),
                  height: Math.min(baseSize.height, desktopSize.height - 32),
                }
              : baseSize;
            const style: React.CSSProperties = isMaximized
              ? { inset: "6rem 2rem 6rem 2rem" }
              : { left: position.x, top: position.y, width: size.width, height: size.height };

            return (
              <section
                key={id}
                className={`window window--floating ${
                  isMinimized ? "window--hidden" : ""
                } ${isMaximized ? "window--max" : ""} ${
                  activeApp === id ? "window--active" : ""
                } ${openingId === id ? "window--opening" : ""} ${
                  minimizingId === id ? "window--minimizing" : ""
                }`}
                style={{ ...style, zIndex: 10 + index }}
                onMouseDown={() => bringToFront(id)}
              >
                <div
                  className="window__bar"
                  onMouseDown={(event) => {
                    if ((event.target as HTMLElement).closest("button")) return;
                    if (isMaximized) return;
                    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
                    setDragging({
                      id,
                      offsetX: event.clientX - rect.left,
                      offsetY: event.clientY - rect.top,
                    });
                  }}
                >
                  <button
                    className="window__dot window__dot--close"
                    type="button"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={() => closeApp(id)}
                    aria-label={`Close ${content.title}`}
                  />
                  <button
                    className="window__dot window__dot--min"
                    type="button"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={() => minimizeApp(id)}
                    aria-label={`Minimize ${content.title}`}
                  />
                  <button
                    className="window__dot window__dot--max"
                    type="button"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={() => toggleMaximize(id)}
                    aria-label={`Maximize ${content.title}`}
                  />
                  {id !== "safari" ? (
                    <span className="window__title">{content.title}</span>
                  ) : null}
                </div>
                <div className="window__body">
                  {id !== "safari" ? (
                    <>
                      {content.subtitle ? (
                        <p className="window__eyebrow">{content.subtitle}</p>
                      ) : null}
                      <h2>{content.title}</h2>
                    </>
                  ) : null}
                  {id === "apps" ? (
                    <div className="launchpad">
                      <div className="launchpad__toolbar">
                        <span>Applications</span>
                        <input type="text" placeholder="Search apps" aria-label="Search apps" />
                      </div>
                      <div className="launchpad__tabs">
                        {[
                          "Productivity",
                          "Utilities",
                          "Social",
                          "Entertainment",
                          "Creativity",
                          "Other",
                        ].map((tab) => (
                          <button key={tab} type="button">
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="launchpad__grid">
                        {launchpadApps.map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            className="launchpad__app"
                            onClick={() => openApp(app.id)}
                          >
                            <span className="launchpad__icon">
                              <img src={app.icon} alt="" aria-hidden="true" />
                            </span>
                            <span className="launchpad__label">{app.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : id === "finder" ? (
                    <div className="finder">
                      <aside className="finder__sidebar">
                        <h4>Favorites</h4>
                        <ul>
                          <li>Recents</li>
                          <li>Applications</li>
                          <li>Desktop</li>
                          <li>Documents</li>
                          <li>Downloads</li>
                        </ul>
                        <h4>Locations</h4>
                        <ul>
                          <li>Macintosh HD</li>
                          <li>Network</li>
                        </ul>
                      </aside>
                      <div className="finder__content">
                        <div className="finder__toolbar">
                          <span>Desktop</span>
                          <span>Grid View</span>
                        </div>
                        <div className="finder__grid">
                          {["CityTalk", "Projects", "Studio", "OS Gallery", "Briefs"].map((item) => (
                            <div key={item} className="finder__item">
                              <span className="finder__icon" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : id === "calendar" ? (
                    <div className="calendar">
                      <div className="calendar__header">
                        <span>February 2026</span>
                        <span>Sun 8</span>
                      </div>
                      <div className="calendar__grid">
                        {Array.from({ length: 28 }, (_, idx) => (
                          <span key={idx} className={idx === 7 ? "active" : ""}>{idx + 1}</span>
                        ))}
                      </div>
                    </div>
                  ) : id === "notes" ? (
                    <div className="notes">
                      <h4>Studio Notes</h4>
                      <ul>
                        <li>Finalize OS demo deck</li>
                        <li>Prep CityTalk live event flow</li>
                        <li>Review launchpad layout</li>
                      </ul>
                    </div>
                  ) : id === "music" ? (
                    <div className="music">
                      <div className="music__album" />
                      <div>
                        <h4>Ambient Cityscapes</h4>
                        <p>Now Playing · 2:14 / 4:32</p>
                      </div>
                      <div className="music__controls">
                        <button type="button">◄◄</button>
                        <button type="button">▶</button>
                        <button type="button">►►</button>
                      </div>
                    </div>
                  ) : id === "terminal" ? (
                    <div className="terminal">
                      <p>$ deploy citytalk --env=prod</p>
                      <p>✔ build complete</p>
                      <p>✔ realtime services online</p>
                      <p>$</p>
                    </div>
                  ) : id === "safari" ? (
                    <div className="safari">
                      <div className="safari__scroll">
                      <div className="safari__top">
                        <div className="safari__nav">
                          <button type="button" aria-label="Back">◀</button>
                          <button type="button" aria-label="Forward">▶</button>
                          <button type="button" aria-label="Reload">⟳</button>
                        </div>
                        <form className="safari__search" onSubmit={handleSafariSearch}>
                          <input
                            type="text"
                            value={safariQuery}
                            onChange={(event) => setSafariQuery(event.target.value)}
                            placeholder="Search or enter website name"
                            aria-label="Search or enter website name"
                          />
                        </form>
                        <div className="safari__actions">
                          <button type="button" aria-label="Share">⤴</button>
                          <button type="button" aria-label="Tabs">▢</button>
                        </div>
                      </div>

                      <div className="safari__start-card">
                        <div className="safari__card-icon">Start Page</div>
                        <div>
                          <h3>Start Page</h3>
                          <p>Customize your wallpaper and sections that appear when creating new tabs.</p>
                        </div>
                        <button type="button">Customize Start Page</button>
                      </div>

                      <div className="safari__section">
                        <h4>Favourites</h4>
                        <div className="safari__favorites">
                          {safariFavorites.map((site) => (
                            <a key={site.url} href={`https://${site.url}`} target="_blank" rel="noreferrer">
                              <span className="safari__fav">
                                <img src={site.icon} alt="" aria-hidden="true" />
                              </span>
                              <span>{site.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="safari__section">
                        <h4>Privacy Report</h4>
                        <div className="safari__privacy">
                          <div>
                            <strong>Last 30 days</strong>
                            <p>Trackers prevented from profiling you: 164</p>
                          </div>
                          <div>
                            <strong>Websites that contacted trackers</strong>
                            <p>Top: news, social, and analytics.</p>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  ) : (
                    <p>{content.body}</p>
                  )}
                </div>
                {!isMaximized ? (
                  <button
                    type="button"
                    className="window__resize"
                    onMouseDown={(event) => {
                      event.stopPropagation();
                      const startX = event.clientX;
                      const startY = event.clientY;
                      const base = positions[id] ?? { x: 0, y: 0 };
                      const baseSize = getWindowSize(id);
                      const handleMove = (moveEvent: MouseEvent) => {
                        const deltaX = moveEvent.clientX - startX;
                        const deltaY = moveEvent.clientY - startY;
                        const nextSize = {
                          width: Math.max(360, baseSize.width + deltaX),
                          height: Math.max(260, baseSize.height + deltaY),
                        };
                        setWindowSizeState((prev) => ({ ...prev, [id]: nextSize }));
                        setPositions((prev) => ({
                          ...prev,
                          [id]: clampPosition(id, base.x, base.y),
                        }));
                      };
                      const handleUp = () => {
                        window.removeEventListener("mousemove", handleMove);
                        window.removeEventListener("mouseup", handleUp);
                      };
                      window.addEventListener("mousemove", handleMove);
                      window.addEventListener("mouseup", handleUp);
                    }}
                  />
                ) : null}
              </section>
            );
          })}
        </div>
      </section>

      {menu ? (
        <div className="context-menu" style={{ left: menu.x, top: menu.y }}>
          <button type="button" onClick={() => openApp("finder")}>Open Finder</button>
          <button type="button" onClick={() => openApp("projects")}>Open Projects</button>
          <button type="button" onClick={() => openApp("settings")}>Settings</button>
          <button type="button">Change Wallpaper</button>
          <button type="button" onClick={() => setWidgetEditOpen(true)}>Edit Widgets</button>
        </div>
      ) : null}

      {spotlightOpen ? (
        <div className="spotlight" onClick={() => setSpotlightOpen(false)}>
          <div className="spotlight__panel" onClick={(event) => event.stopPropagation()}>
            <input type="text" placeholder="Search apps, files, and web..." />
            <div className="spotlight__results">
              {dockApps.slice(0, 6).map((app) => (
                <button key={app.id} type="button" onClick={() => openApp(app.id)}>
                  <img src={app.icon} alt="" />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {controlCenterOpen ? (
        <div className="control-center">
          <div className="control-center__grid">
            <div>
              <strong>Wi‑Fi</strong>
              <p>Connected</p>
            </div>
            <div>
              <strong>Bluetooth</strong>
              <p>On</p>
            </div>
            <div>
              <strong>Focus</strong>
              <p>Off</p>
            </div>
            <div>
              <strong>Display</strong>
              <p>Auto</p>
            </div>
          </div>
        </div>
      ) : null}

      {notificationOpen ? (
        <aside className="notification-center">
          <h4>Notifications</h4>
          <div className="notification-center__card">
            <strong>Codex</strong>
            <p>Notifications may include alerts, sounds and icon badges.</p>
          </div>
          <h4>Calendar</h4>
          <div className="notification-center__card">
            <strong>Tue</strong>
            <p>CityTalk demo · 11:00 AM</p>
          </div>
        </aside>
      ) : null}

      {widgetEditOpen ? (
        <div className="widget-gallery" onClick={() => setWidgetEditOpen(false)}>
          <div className="widget-gallery__panel" onClick={(event) => event.stopPropagation()}>
            <h3>Edit Widgets</h3>
            <div className="widget-gallery__list">
              {widgets.map((widget) => (
                <label key={widget.id}>
                  <input
                    type="checkbox"
                    checked={widgetVisibility[widget.id]}
                    onChange={() =>
                      setWidgetVisibility((prev) => ({
                        ...prev,
                        [widget.id]: !prev[widget.id],
                      }))
                    }
                  />
                  <span>{widget.title}</span>
                </label>
              ))}
            </div>
            <button type="button" onClick={() => setWidgetEditOpen(false)}>Done</button>
          </div>
        </div>
      ) : null}

      <div className="os__dock" role="navigation" aria-label="App dock">
        {dockApps.map((item) => (
          <button
            className="dock__app"
            type="button"
            key={item.id}
            onClick={() => openApp(item.id)}
            aria-label={item.name}
          >
            <span className="dock__icon">
              <img src={item.icon} alt="" aria-hidden="true" />
            </span>
            <span className={openApps.includes(item.id) ? "dock__dot dock__dot--active" : "dock__dot"} />
          </button>
        ))}
      </div>
    </main>
  );
}
