import { useState, useEffect, useCallback } from 'react';
import { mockStreams, mockVideos } from '../data/mock-content';
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

  // Mock fetch events
  const fetchEvents = useCallback(async () => {
    try {
      setRefreshing(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = [...mockStreams];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.creator.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply status filter
      if (filterStatus !== 'all') {
        filtered = filtered.filter(event => event.status === filterStatus);
      }
      
      const mockResponse: EventsResponse = {
        event: filtered,
        pagination: {
          page: 1,
          limit: 50,
          total: filtered.length,
          totalPages: 1
        }
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

  // Mock fetch videos
  const fetchVideos = useCallback(async () => {
    try {
      setRefreshing(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = [...mockVideos];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(video =>
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
          totalPages: 1
        }
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

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === "events") {
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

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    try {
      if (activeTab === "events") {
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
    setSearchTerm("");
    setFilterStatus("all");
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