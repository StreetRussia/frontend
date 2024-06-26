import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/fonts/benzin/benzin.css';

import './global.scss';

import type {
  CardBlogData,
  CardData,
  Event,
  Project,
  CardEventData,
  CardTeamData,
  CardAddressPlaygroundData,
} from './type/type';

import { Header } from '@modules/Header';
import { Footer } from '@modules/Footer';
import { CurrentProjectsPage, HomePage, TeamVideoPage } from './pages';
import { EventsPage } from './pages';
import { DirectionsPage } from './pages';
import { ProjectsPage } from './pages';
import { BlogPage } from './pages';
import { AboutUsPage } from './pages';
import { AddressesPage } from './pages';
import { DepartmentsPage } from './pages';
import { DocumentsPage } from './pages';
import { ProjectDetailPage } from './pages';

import {
  DonationModal,
  QuestionModal,
  ScrollToTopButton,
  ScrollToTop,
} from './components';

import { fetchProjects, fetchEvents } from './utils/api';
import {
  cardsForEvents,
  cardsForProjets,
  cardsForFederalTeam,
  cardsForRegionTeam,
  cardsForNews,
  cardsForArticle,
  cardsForInterview,
  cardsForAdvice,
  playgroundAddresses,
} from './assets/mocks/constants';

export const App = () => {
  const [isDonModalOpen, setIsDonModalOpen] = useState<boolean>(false);
  const [isQuestionModalOpen, setQuestionModalOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, eventsData] = await Promise.all([
          fetchProjects(),
          fetchEvents(),
        ]);
        setProjects(projectsData);
        setEvents(eventsData);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const projectsToRender: CardData[] =
    projects.length > 0
      ? projects.map(project => ({
          id: project.id,
          current_status: project.current_status,
          image: project.preview,
          title: project.name,
          location: project.region.name,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
          fundsRaised: project.funds_raised,
          goal: project.goal,
        }))
      : cardsForProjets;

  const eventsToRender: CardEventData[] =
    events.length > 0
      ? events.map(event => ({
          id: event.id,
          image: event.preview,
          title: event.name,
          location: event.region.name,
          description: event.description,
          startDate: event.start_date,
          endDate: event.end_date,
          direction: event.direction,
        }))
      : cardsForEvents;

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Ошибка загрузки данных:', error);
  }

  const federalManagersToRender: CardTeamData[] = cardsForFederalTeam;
  const regionalManagersToRender: CardTeamData[] = cardsForRegionTeam;
  const newsToRender: CardBlogData[] = cardsForNews;
  const interwiewToRender: CardBlogData[] = cardsForInterview;
  const adviceToRender: CardBlogData[] = cardsForAdvice;
  const articleToRender: CardBlogData[] = cardsForArticle;
  const addressesToRender: CardAddressPlaygroundData[] = playgroundAddresses;

  return (
    <>
      <Router>
        <Header />
        <ScrollToTop />
        <ScrollToTopButton />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                eventsToRender={eventsToRender}
                projectsToRender={projectsToRender}
                setIsDonModalOpen={setIsDonModalOpen}
              />
            }
          />
          <Route
            path="/events"
            element={<EventsPage eventsToRender={eventsToRender} />}
          />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                setIsDonModalOpen={setIsDonModalOpen}
                projectsToRender={projectsToRender}
              />
            }
          />
          <Route
            path="/projects/current"
            element={
              <CurrentProjectsPage
                setIsDonModalOpen={setIsDonModalOpen}
                projectsToRender={projectsToRender}
              />
            }
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetailPage setModalopen={setIsDonModalOpen} />}
          />
          <Route
            path="/blog"
            element={
              <BlogPage
                newsToRender={newsToRender}
                interwiewToRender={interwiewToRender}
                adviceToRender={adviceToRender}
                articleToRender={articleToRender}
              />
            }
          />
          <Route
            path="/about-us"
            element={
              <AboutUsPage
                federalManagersToRender={federalManagersToRender}
                regionalManagersToRender={regionalManagersToRender}
              />
            }
          />
          <Route
            path="/addresses"
            element={<AddressesPage addressToRender={addressesToRender} />}
          />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/team-video" element={<TeamVideoPage />} />
        </Routes>
        <Footer setIsModalOpen={setQuestionModalOpen} />
        <DonationModal
          isDonModalOpen={isDonModalOpen}
          onClose={() => setIsDonModalOpen(false)}
        />
        <QuestionModal
          onClose={() => setQuestionModalOpen(false)}
          isQuestionModalOpen={isQuestionModalOpen}
        />
      </Router>
    </>
  );
};
