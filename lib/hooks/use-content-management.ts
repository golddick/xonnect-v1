import { useState, useEffect, useCallback } from 'react';
import { Event, EventsResponse, Video, VideosResponse } from '../type/content';

export const useContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState<Event | Video | null>(null);
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await fetch('/api/superadmin/content');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load events');
      }

      let filtered = [...(data.events || [])] as Event[];

      if (searchTerm) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.creator.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterStatus !== 'all') {
        filtered = filtered.filter((event) => event.status === filterStatus);
      }

      const mockResponse: EventsResponse = {
        event: filtered,
        pagination: {
          page: 1,
          limit: 50,
          total: filtered.length,
          totalPages: 1,
        },
      };

      setEvents(mockResponse.event);
      return mockResponse;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    } finally {
      setRefreshing(false);
    }
  }, [searchTerm, filterStatus]);

  const fetchVideos = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await fetch('/api/superadmin/content');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load videos');
      }

      let filtered = [...(data.videos || [])] as Video[];

      if (searchTerm) {
        filtered = filtered.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.creator.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const mockResponse: VideosResponse = {
        videos: filtered,
        pagination: {
          page: 1,
          limit: 50,
          total: filtered.length,
          totalPages: 1,
        },
      };

      setVideos(mockResponse.videos);
      return mockResponse;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    } finally {
      setRefreshing(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'events') {
          await fetchEvents();
        } else {
          await fetchVideos();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, fetchEvents, fetchVideos]);

  const handleRefresh = useCallback(async () => {
    try {
      if (activeTab === 'events') {
        await fetchEvents();
      } else {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, [activeTab, fetchEvents, fetchVideos]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setSearchTerm('');
    setFilterStatus('all');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    selectedItem,
    setSelectedItem,
    activeTab,
    events,
    videos,
    loading,
    refreshing,
    handleRefresh,
    handleTabChange,
  };
};